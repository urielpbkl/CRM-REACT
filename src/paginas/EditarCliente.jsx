import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Alerta } from '../components/Alerta'
import { Formulario } from '../components/Formulario'
import { Spinner } from '../components/Spinner'

export const EditarCliente = () => {

  const { id } = useParams() //EXTRAEMOS EL "id" DEL CLIENTE DESDE LA "url"
  const [cliente, setCliente] = useState({}) //AQUÍ VAMOS A GUARDAR LOS DATOS DEL CLIENTE QUE SELECCIONAMOS
  const [cargando, setCargando] = useState(true) //PARA MOSTRAR UN "SPINNER" MIESTRAS CARGA LA CONSULTA

  useEffect(() => {

    const obtenerDatosCliente = async () => {
      try {
        const url = `${import.meta.env.VITE_API_URL}/clientes/clientes-detalle/${id}` //SELECCIONAMOS CLIENTE POR SU "id"
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

  return (
    cargando ? <Spinner /> : (
      <>
        <h1 className='font-black text-4xl text-blue-900'>Editar Cliente</h1>
        <p className='mt-3'>Editar los datos de un cliente:</p>

        {cliente.nombre ? (
          <Formulario
            cliente={cliente}
            cargando={cargando}
          />
        ) : <Alerta>El cliente no existe</Alerta>}
      </>
    )
  )
}
