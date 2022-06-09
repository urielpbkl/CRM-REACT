import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Alerta } from '../components/Alerta'
import { Spinner } from '../components/Spinner'

export const VerCliente = () => {

  const { id } = useParams() //EXTRAEMOS EL "id" DEL CLIENTE DESDE LA "url"
  const [cliente, setCliente] = useState({}) //AQUÍ VAMOS A GUARDAR LOS DATOS DEL CLIENTE QUE SELECCIONAMOS
  const [cargando, setCargando] = useState(true) //PARA MOSTRAR UN "SPINNER" MIESTRAS CARGA LA CONSULTA

  useEffect(() => {

    const obtenerDatosCliente = async () => {
      try {
        const url = `http://127.0.0.1:8000/clientes/clientes-detalle/${id}` //SELECCIONAMOS CLIENTE POR SU "id"
        const respuesta = await fetch(url) //NO PONEMOS EL MÉTODO PORQUE "fetch" POR DEFECTO YA TRAE EL MÉTODO "GET"
        const resultado = await respuesta.json() //CREAMOS UN "JSON" QUE CONTENGA LOS DATOS DEL CLIENTE SELECCIONADO

        setCliente(resultado) //AGREGAMOS AL OBJETO "cliente" LOS DATOS DEL CLIENTE QUE SELECCIONAMOS PARA MOSTRARLOS

      } catch (error) {
        console.log(error)
      }
      setCargando(false) //UNA VEZ TERMINA LA CARGA, CAMBIAMOS EL "state" DE "cargando" PARA QUE DEJE DE MOSTRARSE EL "SPINNER"
    }

    obtenerDatosCliente() //UNA VEZ CARGA EL COMPONENTE INICIAMOS LA CONSULTA A LA "API"
  }, [])

  const { nombre, empresa, email, telefono, notas } = cliente

  return (

    //SI ESTÁ CARGANDO QUE MUESTRE UN "Sppiner" SINO, SI NO HAY DATOS PARA MOSTRAR QUE MANDE UN MENSAJE SEÑALÁNDOLO, SINO QUE MUESTRE LOS DATOS DEL CLIENTE SEÑALADO
    cargando ? <Spinner/> : Object.keys(cliente).length === 0 ? <Alerta>No hay Registros para mostrar</Alerta> : (

      <div>

        <h1 className='font-black text-4xl text-blue-900'>Ver Cliente</h1>
        <p className='mt-3'>Información del Cliente:</p>

        <p className='text-2xl text-gray-700 mt-10'>
          <span className='font-bold'>Cliente: </span>
          {nombre}
        </p>
        <p className='text-2xl text-gray-700 mt-4'>
          <span className='font-bold'>Email: </span>
          {email}
        </p>
        <p className='text-2xl text-gray-700 mt-4'>
          <span className='font-bold'>Teléfono: </span>
          {telefono}
        </p>
        <p className='text-2xl text-gray-700 mt-4'>
          <span className='font-bold'>Empresa: </span>
          {empresa}
        </p>
        <p className='text-2xl text-gray-700 mt-4'>
          <span className='font-bold'>Notas: </span>
          {notas}
        </p>
      </div>
    )
  )
}
