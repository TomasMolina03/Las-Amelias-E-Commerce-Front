import React from 'react'
import {admassets} from '../assets/assetsAdm'

const NavbarAdm = () => {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between '>
      <img className='w-[max(20%,80px)]' src={admassets.logo} alt="" />
      <button className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm' >Cerrar Sesión</button>
    </div>
  )
}

export default NavbarAdm
