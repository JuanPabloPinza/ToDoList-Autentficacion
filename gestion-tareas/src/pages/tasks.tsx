import TaskController from "@/controllers/taskController";
import { Task } from "@/models/task";
import TaskView from "@/views/taskView";
import { useEffect, useState } from "react";
import CreateTask from "./createTask";
import Header from "./components/Header";
import Footer from "./components/Footer";

const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [showEditForm, setShowEditForm] = useState<boolean>(false);

  const controller = new TaskController();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tasksData = await controller.initialize();
        setTasks(tasksData);
      } catch (error) {
        console.error("Error al obtener las tareas:", error);
      }
    };

    fetchData();
  }, [tasks]);

  const handleEdit = (task: Task) => {
    setTaskToEdit(task);

    setShowEditForm(true);
  };

  const handleDelete = async (task: Task) => {
    try {
      await TaskController.deleteTask(task.id);
      setTasks(tasks.filter((t) => t.id !== task.id));
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
    }
  };
  

  const handleTaskSubmit = (updatedTask: Task) => {
    if (taskToEdit) {
      setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
    } else {
      setTasks([...tasks, updatedTask]);
    }
    setTaskToEdit(null);
    setShowEditForm(false);
  };

  return (
    <div className="flex flex-col min-h-screen"> 
      <Header />
      <main className="flex-grow">
        <div className="container">
          <h1 className="text-center text-gray-900 text-2xl font-bold">Lista de Tareas</h1>
          <br></br>
          {showEditForm && (
            <CreateTask taskToEdit={taskToEdit} onTaskSubmit={handleTaskSubmit} />
          )}
          <TaskView tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      </main>
      <Footer/>
    </div>
  );
};

export default TasksPage;
