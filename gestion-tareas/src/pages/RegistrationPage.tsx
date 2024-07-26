import Link from "next/link";
import React, { useState } from "react";
import { UserAuth } from "../controllers/AuthContext";
import { useRouter } from "next/router";

interface RegistrationFormProps {
  onRegister: (user: string, password: string) => Promise<void>;
}

const RegistrationPage: React.FC<RegistrationFormProps> = ({ onRegister }) => {
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { user, googleSignIn, logOut } = UserAuth();

  const handelSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      if ((error as any).code === "auth/popup-closed-by-user") {
        console.log("El usuario cerró la ventana emergente de autenticación.");
      } else {
        console.error(
          "Error durante el inicio de sesión:",
          (error as Error).message
        );
      }
    }
  };

  const handelSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  // Redirigir a pruebaLogin después de la autenticación exitosa
  React.useEffect(() => {
    if (user) {
      router.push({
        pathname: "/",
        query: { user: JSON.stringify(user) },
      });
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await onRegister(user?.uid || "", password);
      setError(null);
    } catch (error) {
      setError("Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
          </div>
          <img
              className="w-20 mx-auto mb-5"
              src="https://cdn-icons-png.flaticon.com/512/2098/2098402.png"
              alt="Tiger icon"
            />
            <h2 className="text-2xl text-center font-bold text-gray-900">Inicio de sesiòn</h2>
            <h1 className="text-2xl text-center font-bold text-gray-900">Gestor de Tareas G4</h1> <br/>
          <div className="w-full flex justify-center mt-4">
            <button
              onClick={handelSignIn}
              className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              <svg
                className="h-6 w-6 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
              >
                <path
                  d="M9.827 24C9.827 22.476 10.08 21.014 10.532 19.644L2.623 13.604C1.082 16.734 0.214 20.26 0.214 24 0.214 27.737 1.081 31.261 2.62 34.388L10.525 28.337C10.077 26.973 9.827 25.517 9.827 24"
                  fill="#FBBC05"
                />
                <path
                  d="M23.714 10.133C27.025 10.133 30.016 11.307 32.366 13.227L39.202 6.4C35.036 2.773 29.695 0.533 23.714 0.533 14.427 0.533 6.445 5.844 2.623 13.604L10.532 19.644C12.355 14.112 17.549 10.133 23.714 10.133"
                  fill="#EB4335"
                />
                <path
                  d="M23.714 37.867C17.549 37.867 12.355 33.888 10.532 28.356L2.623 34.395C6.445 42.156 14.427 47.467 23.714 47.467 29.446 47.467 34.918 45.431 39.025 41.618L31.518 35.814C29.4 37.149 26.732 37.867 23.714 37.867"
                  fill="#34A853"
                />
                <path
                  d="M46.145 24C46.145 22.613 45.932 21.12 45.611 19.733L23.714 19.733V28.8H36.318C35.688 31.891 33.972 34.268 31.518 35.814L39.025 41.618C43.339 37.614 46.145 31.649 46.145 24"
                  fill="#4285F4"
                />
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
