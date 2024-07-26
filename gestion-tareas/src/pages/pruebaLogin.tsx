// pages/pruebaLogin.tsx
import { useRouter } from 'next/router';
import React from 'react';
import { UserAuth } from '../controllers/AuthContext';

const PruebaLogin: React.FC = () => {
  const router = useRouter();
  const { user, logOut } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
      router.push('/'); // Redirige a la página de registro (RegistrationPage)
    } catch (error) {
      console.log(error);
    }
  };

  const userData = user ? user : null;

  return (
    
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">Bienvenido</h1>
              <p className="text-lg">Aquí están los datos del usuario:</p>
              <pre className="bg-gray-200 p-4 mt-4">
                {userData ? JSON.stringify(userData, null, 2) : 'No user data'}
              </pre>
              
              <div className="mt-4">
                <button
                  onClick={handleSignOut}
                  className="bg-red-500 text-white rounded-md px-4 py-2"
                >
                  Salir
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PruebaLogin;
