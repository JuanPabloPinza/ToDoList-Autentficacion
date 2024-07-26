import React, { useEffect, useState } from "react";
import { Task } from "../models/task";
import { useRouter } from "next/router";

interface TaskViewProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

const TaskView: React.FC<TaskViewProps> = ({ tasks, onEdit, onDelete }) => {

    const router = useRouter();

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleRedirect = () => {
        router.push("/createTask");
    };

    if (!isClient) {
        return null;
    }

  return (
    <div className="task-grid">
      {tasks.length === 0 ? (
        <div className="text-center mt-8 text-gray-700">
          <p className="text-2xl relative bg-gray-700 block p-6 border border-gray-100 rounded-lg max-w-sm mx-auto mt-24">
            <br />
                <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

                <div className="my-4">
                    <h2 className="text-white text-2xl font-bold pb-2">Aun no tienes tareas agregadas.😞</h2>
                </div>
                <br />
                <div>
                    <button onClick={handleRedirect} className="px-2 py-1 text-white border border-gray-200 font-semibold rounded hover:bg-gray-800">
                        Agregar
                    </button>
                </div>
                <br />
            </p>
        </div>
      ) : (
        tasks.map((task) => (
          <div
            key={task.id}
            className="task-card content bg-white p-2 pt-8 md:p-12 pb-12 lg:max-w-lg w-full lg:absolute top-48 right-5"
          >
            <div className="flex justify-between font-bold text-sm">
              <p>Estado: {task.status}</p>
              <p className="text-gray-400">{task.date}</p>
            </div>
            <h2 className="text-3xl font-semibold mt-4 md:mt-10">{task.name}</h2>
            <p className="my-3 text-justify font-medium text-gray-700 leading-relaxed">
              {task.description}
            </p>
            <div className="task-buttons ">
              <button className="mr-2 mt-2 md:mt-5 p-3 px-5 bg-black text-white font-bold text-sm hover:bg-purple-800" onClick={() => onEdit(task)}>Editar</button>
              <button className="mt-2 md:mt-5 p-3 px-5 bg-black text-white font-bold text-sm hover:bg-purple-800" onClick={() => onDelete(task)}>Borrar</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TaskView;
