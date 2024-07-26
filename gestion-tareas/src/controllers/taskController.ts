// TaskController.ts
import { Task, TaskModel } from '../models/task';
import { auth } from '../firebase'; 

class TaskController {
    private model: TaskModel;

    constructor() {
        this.model = new TaskModel();
    }

    private static async getAuthToken(): Promise<string> {
        const user = auth.currentUser;
        if (user) {
            return await user.getIdToken();
        }
        throw new Error('Usuario no autenticado');
    }

    async initialize(): Promise<Task[]> {
        try {
            const token = await TaskController.getAuthToken();
            const response = await fetch('http://localhost:5000/firstapirest/us-central1/app/api/todolist', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (!response.ok) {
                throw new Error(`Error en la petición: ${response.statusText}`);
            }

            const tasks = await response.json();
            tasks.forEach((taskData: any) => {
                const task = new Task(taskData.id, taskData.name, taskData.description, taskData.date, taskData.status);
                this.model.addTask(task);
            });
            return this.model.getTasks();
        } catch (error) {
            console.error('Error:', error);
            return [];
        }
    }

    static async addTask(newTask: Task): Promise<void> {
        try {
            const token = await TaskController.getAuthToken();
            const response = await fetch('http://localhost:5000/firstapirest/us-central1/app/api/todolist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newTask)
            });

            if (!response.ok) {
                throw new Error('Error en la petición');
            }

            const task = await response.json();
            console.log("Tarea creada:", task);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    static async getTask(id: string): Promise<Task> {
        try {
            const token = await TaskController.getAuthToken();
            const response = await fetch(`http://localhost:5000/firstapirest/us-central1/app/api/todolist/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Error en la petición');
            }

            const taskData = await response.json();
            const task = new Task(taskData.id, taskData.name, taskData.description, taskData.date, taskData.status);
            console.log("Tarea obtenida:", task);
            return task;
        } catch (error) {
            console.error('Error:', error);
            return new Task('', '', '', '', '');
        }
    }

    static async updateTask(id: string, updatedTask: Task): Promise<void> {
        try {
            const token = await TaskController.getAuthToken();
            const response = await fetch(`http://localhost:5000/firstapirest/us-central1/app/api/todolist/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updatedTask)
            });

            if (!response.ok) {
                throw new Error('Error en la petición');
            }

            const task = await response.json();
            console.log("Tarea actualizada:", task);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    static async deleteTask(id: string): Promise<void> {
        try {
            const token = await TaskController.getAuthToken();
            const response = await fetch(`http://localhost:5000/firstapirest/us-central1/app/api/todolist/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Error en la petición');
            }

            console.log("Tarea eliminada");
        } catch (error) {
            console.error('Error:', error);
        }
    }
}

export default TaskController;
