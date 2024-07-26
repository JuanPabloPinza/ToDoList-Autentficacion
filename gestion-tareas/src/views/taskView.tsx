import React from "react";
import { Task } from "../models/task";

interface TaskViewProps{
    tasks: Task[];
    onEdit: (task: Task) => void;
    onDelete: (task: Task) => void;
}

const TaskView: React.FC<TaskViewProps> = ({tasks, onEdit, onDelete}) => {
    return (
        <div className="task-grid">
            {tasks.map((task) => (
                <div key={task.id} className="task-card">
                    <h2>{task.name} {"id:"} {task.id}</h2>
                    <p>{task.description}</p>
                    <p>Fecha: {task.date}</p>
                    <p>Estado: {task.status}</p>
                    <div className="task-buttons">
                        <button onClick={() => onEdit(task)}>Editar</button>
                        <button onClick={() => onDelete(task)}>Borrar</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TaskView