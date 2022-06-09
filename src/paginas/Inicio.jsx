import React, { useEffect, useState } from 'react'
import { Cliente } from '../components/Cliente'

export const Inicio = () => {

  const [clientes, setClientes] = useState([])

  useEffect(() => {
    const obtenerClientesAPI = async () => {
      try {
        const url = `${import.meta.env.VITE_API_URL}/clientes/clientes-view/`
        const respuesta = await fetch(url) //NO PONEMOS EL MÉTODO PORQUE "fetch" POR DEFECTO YA TRAE EL MÉTODO "GET"
        const resultado = await respuesta.json()//CREAMOS UN "JSON" QUE CONTENGA TODOS LOS REGISTROS QUE TENEMOS EN LA BD
        setClientes(resultado) //GUARDAMOS TODOS LOS REGISTROS EN EL OBJETO "clientes"
      } catch (error) {
        console.log(error)
      }
    }
    obtenerClientesAPI()
  }, [])

  const handleEliminar = async (id) => {

    const confirmar = confirm('Deseas eliminar este cliente?')

    if (confirmar) {
      try {
        const url = `${import.meta.env.VITE_API_URL}/clientes/clientes-detalle/${id}` //SELECCIONAMOS CLIENTE POR SU "id"
        const respuesta = await fetch(url, {
          method: 'DELETE'
        }) //NO PONEMOS EL MÉTODO PORQUE "fetch" POR DEFECTO YA TRAE EL MÉTODO "GET"
        const resultado = await respuesta.json() //CREAMOS UN "JSON" QUE CONTENGA LOS DATOS DEL CLIENTE SELECCIONADO
 
      } catch (error) {
        console.log(error)
      }

    }
    const arrayClientes = clientes.filter(cliente => cliente.id !== id)
    setClientes(arrayClientes) //AGREGAMOS AL OBJETO "arrayClientes" LOS DATOS DEL CLIENTE QUE SELECCIONAMOS PARA MOSTRARLOS
  }
  

  return (
    <>
      <h1 className='font-black text-4xl text-blue-900'>Clientes</h1>
      <p className='mt-3'>Administra tus clientes:</p>

      <table className='w-full table-auto shadow bg-white mt-10'>

        <thead className='bg-blue-800 text-white'>
          <tr>
            <th className='p-2'>Nombre</th>
            <th className='p-2'>Contacto</th>
            <th className='p-2'>Empresa</th>
            <th className='p-2'>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {clientes.map(cliente => (
            <Cliente
              key={cliente.id}
              cliente={cliente}
              handleEliminar={handleEliminar}
            />
          ))}

        </tbody>

      </table>

    </>
  )
}
