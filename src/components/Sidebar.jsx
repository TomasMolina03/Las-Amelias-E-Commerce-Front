import React from 'react'
import { NavLink } from 'react-router-dom'
import { admassets } from '../assets/assetsAdm'

const Sidebar = () => {
  return (
    <div className='w-[18% min-h-screen border-r-2'>
      <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>
        <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l' to="/add" >
            <img className='w-5 h-5' src={admassets.add_icon}/>
            <p className='hidden md:block'>Añadir productos</p>
        </NavLink>
        <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l' to="/list" >
            <img className='w-5 h-5' src={admassets.order_icon}/>
            <p className='hidden md:block'>Lista de productos</p>
        </NavLink>
        <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l' to="/ordersAdm" >
            <img className='w-5 h-5' src={admassets.order_icon}/>
            <p className='hidden md:block'>Órdenes</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
