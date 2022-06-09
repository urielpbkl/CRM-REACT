import React from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'

export const Cliente = ({ cliente, handleEliminar }) => {

    const navigate = useNavigate() //LO USAMOS PARA REDIRECCIONAR
    const { nombre, empresa, email, telefono, notas, id } = cliente

    return (
        <tr className='border hover:bg-gray-100'>
            <td className='p-3'>{nombre}</td>
            <td className='p-3'>
                <p className='text-gray-800 font-bold'><span>Email: </span>{email}</p>
                <p className='text-gray-800 font-bold'><span>Tel: </span>{telefono}</p>
            </td>
            <td className='p-3'>{empresa}</td>
            <td className='p-3'>
                <button
                    type='button'
                    className='bg-teal-500 hover:bg-teal-600 block w-full text-white p-2 uppercase font-bold text-xs rounded-md'
                    onClick={() => navigate(`${id}`)}
                >Ver</button>
                <button
                    type='button'
                    className='bg-blue-600 hover:bg-blue-700 block w-full text-white p-2 uppercase font-bold text-xs rounded-md mt-3'
                    onClick={() => navigate(`/editar/${id}`)}
                >Editar</button>
                <button
                    type='button'
                    className='bg-red-600 hover:bg-red-700 block w-full text-white p-2 uppercase font-bold text-xs mt-3 rounded-md'
                    onClick={() => handleEliminar(id)}
                >Eliminar</button>
            </td>
        </tr>
    )
}
