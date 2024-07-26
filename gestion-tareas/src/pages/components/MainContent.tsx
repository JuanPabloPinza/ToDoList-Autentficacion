import React from 'react'
import { useRouter } from 'next/router';


const MainContent = () => {
  const router = useRouter();

  return (
    <div>
        <div
                className="h-screen w-full mx-auto py-20 xl:px-16 xs:px-8 flex md:flex-row xs:flex-col gap-4 justify-center items-center pb-10 pt-4">
                <div className="w-full">
                    <img className="rounded-full md:max-w-[70%] sm:max-w-[50%] xs:max-w-[60%] mx-auto" src="https://ouch-cdn2.icons8.com/P1Lvd7_LVc39k99JUDUpj7UKKNQj0C8VIHBpqWWk_dE/rs:fit:356:456/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvODA4/LzgwOTZlYjkzLWE0/M2EtNGQ5Ny1hYjhk/LWRiMmViODFmYmMz/MS5wbmc.png" alt="My Image" />
                </div>
                <div className="w-full flex flex-col justify-center gap-4 text-white dark:text-gray-800 md:mt-0 sm:mt-8 xs:mt-4">
                    <h1 className="text-4xl font-semibold font-serif text-neutral-950">Hola, bienvenido a tu administrador de tareas</h1>
                    <hr></hr>
                    <p>Esta pagina te ayudara a llevar un control de las tareas que tengas, puedes anotarlas editarlas o eliminarlas una vez las hayas finalizado.</p>
                    <p>Espero que te sea de ayuda, y puedas organizar mejor todos tus pendientes.</p>
                            <div className="sm:mt-4 xs:mt-2">
                        <button onClick={()=>{
                          router.push({
                            pathname: '/RegistrationPage',
                          });
                        }} className="px-6 py-1 bg-rose-500 text-white rounded-sm">Empezar</button>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default MainContent