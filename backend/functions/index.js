const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const admin = require('firebase-admin');
const express = require("express");
const app = express();

var serviceAccount = require("./credentials-firebase.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

app.use(express.json()); 

// Middleware para verificar autenticación y obtener UID del usuario
async function verifyAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ error: "No token provided" });
    }

    const idToken = authHeader.split('Bearer ')[1];
    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        req.user = decodedToken;
        next();
        console.log(decodedToken)
    } catch (error) {
        logger.error("Error verifying token:", error);
        return res.status(403).json({ error: "Unauthorized" });
    }
}

// Crear una nueva tarea
app.post('/api/todolist', verifyAuth, async (req, res) => {
    try {
        const { name, date, description, status } = req.body;
        const userUid = req.user.uid;
        const userTasksRef = db.collection('usuariostareas').doc(userUid).collection('tasks');

        const newTaskRef = userTasksRef.doc();
        await newTaskRef.set({
            id: newTaskRef.id,
            name,
            date,
            description,
            status
        });

        return res.status(201).json({ id: newTaskRef.id });
    } catch (error) {
        logger.error("Error creating the task:", error);
        return res.status(500).json({ error: "Error creating the task" });
    }
});

// Eliminar una tarea por su ID
app.delete('/api/todolist/:id', verifyAuth, async (req, res) => {
    try {
        const userUid = req.user.uid;
        const taskId = req.params.id;
        const taskRef = db.collection('usuariostareas').doc(userUid).collection('tasks').doc(taskId);
        
        const taskDoc = await taskRef.get();
        if (!taskDoc.exists) {
            return res.status(404).json({ error: "Task not found" });
        }

        await taskRef.delete();
        return res.status(204).json();
    } catch (error) {
        logger.error("Error deleting task:", error);
        return res.status(500).json({ error: "Error deleting task" });
    }
});

// Actualizar una tarea por su ID
app.put('/api/todolist/:id', verifyAuth, async (req, res) => {
    try {
        const { name, date, description, status } = req.body;
        const userUid = req.user.uid;
        const taskId = req.params.id;
        const taskRef = db.collection('usuariostareas').doc(userUid).collection('tasks').doc(taskId);

        const taskDoc = await taskRef.get();
        if (!taskDoc.exists) {
            return res.status(404).json({ error: "Task not found" });
        }

        await taskRef.update({ name, date, description, status });
        return res.status(204).json();
    } catch (error) {
        logger.error("Error updating task:", error);
        return res.status(500).json({ error: "Error updating task" });
    }
});

// Obtener una tarea por su ID
app.get('/api/todolist/:id', verifyAuth, async (req, res) => {
    try {
        const userUid = req.user.uid;
        const taskId = req.params.id;
        const taskRef = db.collection('usuariostareas').doc(userUid).collection('tasks').doc(taskId);
        const taskDoc = await taskRef.get();

        if (!taskDoc.exists) {
            return res.status(404).json({ error: "Task not found" });
        }

        return res.status(200).json(taskDoc.data());
    } catch (error) {
        logger.error("Error getting task:", error);
        return res.status(500).json({ error: "Error getting task" });
    }
});

// Obtener todas las tareas del usuario autenticado
app.get('/api/todolist', verifyAuth, async (req, res) => {
    try {
        const userUid = req.user.uid;
        const userTasksRef = db.collection('usuariostareas').doc(userUid).collection('tasks');
        const snapshot = await userTasksRef.get();

        const tasks = [];
        snapshot.forEach(doc => {
            tasks.push(doc.data());
        });

        return res.status(200).json(tasks);
    } catch (error) {
        logger.error("Error getting tasks:", error);
        return res.status(500).json({ error: "Error getting tasks" });
    }
});

exports.app = onRequest(app);
