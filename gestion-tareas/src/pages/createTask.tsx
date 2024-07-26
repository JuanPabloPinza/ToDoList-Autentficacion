import TaskController from "@/controllers/taskController";
import { useState, useEffect } from "react";
import { Task } from "../models/task";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ConfirmMessageModal from "./components/ConfirmMessage";

interface CreateTaskProps {
  taskToEdit?: Task | null;
  onTaskSubmit?: (task: Task) => void;
}

const CreateTask: React.FC<CreateTaskProps> = ({
  taskToEdit,
  onTaskSubmit,
}) => {
  const [id, setId] = useState<string>(taskToEdit?.id || "");
  const [name, setName] = useState<string>(taskToEdit?.name || "");
  const [description, setDescription] = useState<string>(
    taskToEdit?.description || ""
  );
  const [date, setDate] = useState<string>(taskToEdit?.date || "");
  const [status, setStatus] = useState<string>(
    taskToEdit?.status || "pendiente"
  );

  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    if (taskToEdit) {
      setId(taskToEdit.id);
      setName(taskToEdit.name);
      setDescription(taskToEdit.description);
      setDate(taskToEdit.date);
      setStatus(taskToEdit.status);
    }
  }, [taskToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newTask = new Task(id, name, description, date, status);

    try {
      if (taskToEdit) {
        await TaskController.updateTask(id, newTask);
      } else {
        await TaskController.addTask(newTask);
      }

      setId("");
      setName("");
      setDescription("");
      setDate("");
      setStatus("pendiente");

      if (onTaskSubmit) {
        onTaskSubmit(newTask);
      }
      setShowModal(true);
    } catch (error) {
      console.error("Error al manejar la tarea:", error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-200">
      <Header />
      <br></br>
      <br></br>
      <div className="flex flex-grow justify-center items-center">
        <div className="w-full max-w-lg bg-white rounded-lg p-8 shadow-lg">
          <header className="mb-5">
            <img
              className="w-20 mx-auto mb-5"
              src="https://cdn-icons-png.flaticon.com/512/2098/2098402.png"
              alt="Tiger icon"
            />
            <h2 className="text-center text-gray-900 text-2xl font-bold">
              {taskToEdit ? "Editar Tarea" : "Crear Tarea"}
            </h2>
          </header>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block mb-2 text-gray-600" htmlFor="name">
                Nombre
              </label>
              <input
                className="w-full p-3 text-gray-800 border-b-2 border-gray-400 outline-none focus:bg-gray-200"
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-gray-600" htmlFor="description">
                Descripción
              </label>
              <textarea
                className="w-full p-3 text-gray-800 border-b-2 border-gray-400 outline-none focus:bg-gray-200 h-20 resize-none"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-gray-600" htmlFor="date">
                Fecha
              </label>
              <input
                className="w-full p-3 text-gray-800 border-b-2 border-gray-400 outline-none focus:bg-gray-200"
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-gray-600" htmlFor="status">
                Estado
              </label>
              <select
                className="w-full p-3 text-gray-800 border-b-2 border-gray-400 outline-none focus:bg-gray-200"
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="pendiente">Pendiente</option>
                <option value="en progreso">En progreso</option>
                <option value="completa">Completa</option>
              </select>
            </div>
            <div>
              <button
                className="w-full bg-gray-700 hover:bg-pink-700 text-white font-bold py-3 px-4 rounded transition duration-300"
                type="submit"
              >
                {taskToEdit ? "Actualizar tarea" : "Crear tarea"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <br></br>
      <br></br>
      <Footer />
      {showModal && (
        <ConfirmMessageModal message="¡Tarea creada exitosamente!" onClose={closeModal} />
      )}
    </div>
  );
};

export default CreateTask;
