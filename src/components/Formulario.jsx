import React from 'react'
import { Formik, Form, Field } from 'formik' //LO USAMOS PARA CREAR FORMULARIOS
import * as Yup from 'yup' //LA USAMOS PARA HACER LA VALIDACIÓN DE LOS FORMULARIOS
import { Alerta } from './Alerta'
import { useNavigate } from 'react-router-dom' //NOS VA A PERMITIR REDIRECCIONAR CUANDO TERMINEMOS DE LLENAR EL FORMULARIO
import { Spinner } from './Spinner'

export const Formulario = ({ cliente, cargando }) => {

    const navigate = useNavigate()

    const nuevoClienteSchema = Yup.object().shape({

        nombre: Yup.string()
            .min(2, 'El Nombre es Demasiado Corto')
            .max(40, 'El Nombre es Demasiado Largo')
            .required('Este Campo es Obligatorio'),

        empresa: Yup.string()
            .required('Este Campo es Obligatorio'),

        email: Yup.string()
            .email('El e-mail no es válido')
            .required('Este Campo es Obligatorio'),

        telefono: Yup.number()
            .positive('El número no es Válido')
            .integer('El número no es Válido')
            .typeError('El número no es Válido')
            .required('Este Campo es Obligatorio'),

        notas: Yup.string()
            .required('Este Campo es Obligatorio'),
    })

    const handleSubmit = async (valores) => {
        try {

            let respuesta

            if (cliente.id) {
                //-----------------------------EDITAR REGISTRO------------------------------------
                const url = `${import.meta.env.VITE_API_URL}/clientes-detalle/${cliente.id}` //AGREGAMOS EL "endpoint" DE LA "api"

                respuesta = await fetch(url, {
                    method: 'PUT', //USAMOS EL MÉTODO "http" PUT
                    body: JSON.stringify(valores), //CREAMOS UN "JSON" QUE CONTENGA LOS VALORES QUE AGREGAMOS AL CAMPO
                    headers: { //EN EL HEADER AGREGAMOS LO SIGUIENTE QUE PIDE LA LIBRERÍA "JSON-Server"
                        'Content-Type': 'application/json'
                    }
                })

            } else {
                //-----------------------------NUEVO REGISTRO------------------------------------

                const url = `${import.meta.env.VITE_API_URL}/clientes-view/` //AGREGAMOS EL "endpoint" DE LA "api"

                respuesta = await fetch(url, {
                    method: 'POST', //USAMOS EL MÉTODO "http" PUT
                    body: JSON.stringify({
                        "nombre": valores.nombre,
                        "empresa": valores.empresa,
                        "email": valores.email,
                        "telefono": valores.telefono,
                        "notas": valores.notas
                    }), //CREAMOS UN "JSON" QUE CONTENGA LOS VALORES QUE AGREGAMOS AL CAMPO
                    headers: { //EN EL HEADER AGREGAMOS LO SIGUIENTE QUE PIDE LA LIBRERÍA "JSON-Server"
                        'Content-Type': 'application/json'
                    }
                })
            }

            const resultado = await respuesta.json()
            navigate('/clientes')

        } catch (error) {
            console.log(error)
        }
    }

    return (

        cargando ? <Spinner /> : (

            <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
                <h1 className='text-gray-600 font-bold text-xl uppercase text-center'>{cliente.nombre ? 'Editar Cliente' : 'Agregar Cliente'}</h1>

                <Formik
                    initialValues={{ //INICIALIZAMOS LOS VALORES DE LOS CAMPOS
                        nombre: cliente.nombre ? cliente.nombre : '', //SI NO EXISTE ESTEN DATOS EN ESTE CAMPO, QUE SE INICIALIZE COMO UN "string vacío", LO HACEMOS PARA CARGAR LOS DATOS CUANDO VAMOS A EDITAR UN REGISTRO
                        empresa: cliente.empresa ? cliente.empresa : '',
                        email: cliente.email ? cliente.email : '',
                        telefono: cliente.telefono ? cliente.telefono : '',
                        notas: cliente.notas ? cliente.notas : '',
                    }}

                    enableReinitialize={true} //LA USAMOS PARA QUE SE MUESTREN LOS DATOS YA EXISTENTES EN EL HTML, EN SUS RESPECTIVOS CAMPOS

                    onSubmit={async (valores, { resetForm }) => {
                        await handleSubmit(valores) //ENVIAMOS LOS DATOS A LA BD AL PRESIONAR EL BOTÓN
                        resetForm() //ESPERAMOS A QUE SE TERMINE DE EJECUTAR LA FUNCIÓN DE ARRIBA CON "await" PARA RESETEAR LOS VALORES QUE AGREGAMOS A LOS CAMPOS DEL FORMULARIO
                    }}

                    validationSchema={nuevoClienteSchema} //USAMOS LAS VALIDACIONES QUE HICIMOS CON "yup"

                >
                    {({ errors, touched }) => {
                        //console.log(touched)
                        return (
                            <Form
                                className='mt-10'
                            >
                                <div className='mb-4'>
                                    <label
                                        className='text-gray-800'
                                        htmlFor='nombre'
                                    >Nombre:</label>
                                    <Field
                                        name='nombre'
                                        id='nombre'
                                        type='text'
                                        className='mt-2 block w-full p-3 bg-gray-100'
                                        placeholder='Ingresa el Nombre del Cliente'
                                    />

                                    {errors.nombre && touched.nombre ? (
                                        <Alerta>{errors.nombre}</Alerta>
                                    ) : null}

                                </div>

                                <div className='mb-4'>
                                    <label
                                        className='text-gray-800'
                                        htmlFor='empresa'
                                    >Empresa:</label>
                                    <Field
                                        name='empresa'
                                        id='empresa'
                                        type='text'
                                        className='mt-2 block w-full p-3 bg-gray-100'
                                        placeholder='Ingresa el Nombre de la Empresa'
                                    />

                                    {errors.empresa && touched.empresa ? (
                                        <Alerta>{errors.empresa}</Alerta>
                                    ) : null}


                                </div>
                                <div className='mb-4'>
                                    <label
                                        className='text-gray-800'
                                        htmlFor='email'
                                    >E-mail:</label>
                                    <Field
                                        name='email'
                                        id='email'
                                        type='email'
                                        className='mt-2 block w-full p-3 bg-gray-100'
                                        placeholder='Ingresa el Email'
                                    />

                                    {errors.email && touched.email ? (
                                        <Alerta>{errors.email}</Alerta>
                                    ) : null}

                                </div>
                                <div className='mb-4'>
                                    <label
                                        className='text-gray-800'
                                        htmlFor='telefono'
                                    >Teléfono:</label>
                                    <Field
                                        name='telefono'
                                        id='telefono'
                                        type='tel'
                                        className='mt-2 block w-full p-3 bg-gray-100'
                                        placeholder='Ingresa el Número de Teléfono'
                                    />

                                    {errors.telefono && touched.telefono ? (
                                        <Alerta>{errors.telefono}</Alerta>
                                    ) : null}

                                </div>
                                <div className='mb-4'>
                                    <label
                                        className='text-gray-800'
                                        htmlFor='notas'
                                    >Notas:</label>
                                    <Field
                                        name='notas'
                                        as='textarea'
                                        id='notas'
                                        type='text'
                                        className='mt-2 block w-full p-3 bg-gray-100 h-40'
                                        placeholder='Ingresa el Número de Teléfono'
                                    />
                                    {errors.notas && touched.notas ? (
                                        <Alerta>{errors.notas}</Alerta>
                                    ) : null}
                                </div>

                                <button
                                    type='submit'
                                    className='mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg'
                                >{cliente.nombre ? 'Guardar Cambios' : 'Agregar Cliente'}</button>
                            </Form>
                        )
                    }}

                </Formik>

            </div>
        )
    )
}

Formulario.defaultProps = { //MANDAMOS CAMPOS VACÍOS EN EL FORMULARIO CUANDO QUEREMOS AGREGAR UN NUEVO REGISTRO
    cliente: {}, //ARREGLO VACÍO
    cargando: false
}