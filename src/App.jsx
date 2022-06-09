import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './layout/Layout'
import { EditarCliente } from './paginas/EditarCliente'
import { Inicio } from './paginas/Inicio'
import { NuevoCliente } from './paginas/NuevoCliente'
import { VerCliente } from './paginas/VerCliente'

function App() {

  return (
    <BrowserRouter>
      <Routes>

        <Route path='/clientes' element={<Layout />}> {/* EL MASTER PAGE ES EL COMPONENTE "Layout.jsx" */}
          <Route index element={<Inicio />} /> {/*COMPONENTE QUE SE VA A CARGAR CUANDO SE VISITE LA "url" DE ARRIBA */}
          <Route path='nuevo' element={<NuevoCliente />} />
          <Route path='editar/:id' element={<EditarCliente />} />
          <Route path=':id' element={<VerCliente />} /> {/* VER UN CLIENTE EN ESPECÍFICO */}
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
