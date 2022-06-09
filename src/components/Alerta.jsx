import React from 'react'

export const Alerta = ({children}) => {
    return (
        <div className='text-center my-4 mx-auto bg-red-400 w-3/4 text-white font-bold p-3 uppercase'>
            {children}
        </div>
    )
}
