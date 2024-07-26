import React from "react";
import { useRouter } from "next/router";
import { UserAuth } from "../../controllers/AuthContext";

function Header() {
  const router = useRouter();
  const { user, logOut } = UserAuth();
  const userData = user ? user : null;

  const handleSignOut = async () => {
    try {
      await logOut();
      router.push('/'); // Redirige a la página de registro (RegistrationPage)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="w-full h-full bg-gray-900 dark:bg-gray-100">
        <header className="lg:px-16 px-4 flex flex-wrap items-center py-4 shadow-lg">
          {user ?<div className="flex-1 flex justify-between items-center">
            <h1 className="text-3xl text-white dark:text-gray-800">
            Hola {userData.displayName}{" "}
              </h1>
              {userData && userData.photoURL && (
                <div className="mt-4 text-center">
                  <img
                    src={userData.photoURL}
                    alt="User Photo"
                    className="w-24 h-24 rounded-full mx-auto"
                  />
                </div>
              )}
          </div>:(
            <div className="flex-1 flex justify-between items-center">
              <h1 className="text-3xl text-white dark:text-gray-800">
                Hola Bienvenido{" "}
              </h1>
            </div>
          )}
          <label className="pointer-cursor md:hidden block">
            <svg
              className="fill-current text-gray-200"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
            >
              <title>menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </label>
          <input className="hidden" type="checkbox" id="menu-toggle" />

          <div
            className="hidden md:flex md:items-center md:w-auto w-full"
            id="menu"
          >
            <nav>
              <ul className="md:flex items-center justify-between text-base text-gray-100 dark:text-gray-600 pt-4 md:pt-0">
                <li>
                  <a className="md:p-4 py-3 px-0 block text-gray-700" href="/">
                    Home
                  </a>
                </li>
                <li>
                  <a
                    className="md:p-4 py-3 px-0 block text-gray-700"
                    href="./createTask"
                  >
                    Crear Tarea
                  </a>
                </li>
                <li>
                  <a
                    className="md:p-4 py-3 px-0 block text-gray-700"
                    href="./tasks"
                  >
                    Ver Tareas
                  </a>
                </li>
                <li>
                  <a className="md:p-4 py-3 px-0 block text-gray-700" onClick={handleSignOut}>
                    Salir
                  </a>
                </li>{" "}
              </ul>
            </nav>
          </div>
        </header>
      </div>
    </div>
  );
}
export default Header;
