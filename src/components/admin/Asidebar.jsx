import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { useState } from 'react';

function Asidebar() {
  const [isMenu, setIsMenu] = useState(true)

  function submitLogout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.reload(false)
  }

  return (
    <aside className={`h-screen fixed z-50 md:sticky top-0 ${isMenu ?'w-48' : 'w-0'}`}>
    {!isMenu ? <button onClick={() => setIsMenu(true)} className='container mx-auto z-[99] bg-customBlack inline-block w-fit mt-5 absolute rounded-full aspect-square'><IoMdMenu size={'2rem'}/></button> :
    <button onClick={() => setIsMenu(false)} className='container mx-auto z-[99] bg-customBlack inline-block w-fit mt-5 absolute rounded-full aspect-square'><IoMdClose size={'2rem'}/></button>
    }
      {isMenu && <div className='bg-customBlack h-[calc(100vh-2.5rem)] mt-5 ml-5 p-2 rounded-xl'>
        <div>
          <img src="/logo.png" alt="" className=' w-28 mx-auto'/>
        </div>
        <nav className='mt-5 container mx-auto'>
          <ul>
            <li><Link to='/' className='inline-block bg-blue-500 px-2 py-1 rounded-2xl text-customBlack font-semibold'>Homepage</Link></li>
            <li className='rounded-2xl'><NavLink to='/admin/tablero' className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }>Tablero</NavLink></li>
            <li className='rounded-2xl'><NavLink to='/admin/usuarios' className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }>Usuarios</NavLink></li>
              <li className='rounded-2xl'><NavLink to='/admin/reservaciones' className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }>Reservaciones</NavLink></li>
                <li className='rounded-2xl'><NavLink to='/admin/socios' className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }>Socios</NavLink></li>
              <li><button onClick={submitLogout} className='bg-secondaryColor px-2 py-1 rounded-2xl'>Cerrar sesión</button></li>
          </ul>
        </nav>
      </div>}
    </aside>
  )
}

export default Asidebar