import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

export const Layout = () => {

    const location = useLocation() //"useLocation()" ES UN "Hook" QUE ME PERMITE SABES LA "url" DEL SITIO EN LA QUE ESTOY ACTUALMENTE
    const urlActual = location.pathname //TRAIGO EL "path" SOLAMENTE 

    return (
        <div className='md:flex md:min-h-screen'>

            <div className='md:w-1/4 bg-blue-900 px-5 py-10'>
                <h2 className='text-4xl font-black text-center text-white'>CRM-Clientes</h2>

                <nav className='mt-10'>
                    <Link
                        className={`${urlActual === '/clientes' ? 'text-blue-300' : 'text-white'} text-2xl block mt-2 hover:text-blue-300`}/* SI ESTOY EN LA "url" DE ESTE LINK, QUE CAMBIE EL ESTILO, SINO QUE SE QUEDE CON EL ORIGINAL */
                        to='/clientes'>Clientes</Link>
                    <Link
                        className={`${urlActual === '/clientes/nuevo' ? 'text-blue-300' : 'text-white'} text-2xl block mt-2 hover:text-blue-300`} /* SI ESTOY EN LA "url" DE ESTE LINK, QUE CAMBIE EL ESTILO, SINO QUE SE QUEDE CON EL ORIGINAL */
                        to='/clientes/nuevo'>Agregar Nuevo Cliente</Link>
                </nav>
            </div>

            <div className='md:w-3/4 p-10 md:h-screen overflow-scroll'>
                <Outlet /> {/* AQUÍ VA A IR EL CONTENIDO DE LOS COMPONENTES */}
            </div>


        </div>
    )
}
