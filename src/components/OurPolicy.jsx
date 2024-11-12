import React from 'react'
import { assets } from '../assets/user/assets'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
      
      <div>
        <img src={assets.exchange_icon} className='w-12 m-auto mb-5'alt="" />
        <p className='font-semibold'>Cambios</p>
        <p className='text-gray-400'>Durante los primeros 5 días</p>
      </div>
      <div>
        <img src={assets.quality_icon} className='w-12 m-auto mb-5'alt="" />
        <p className='font-semibold'>Productos de alta calidad</p>
        <p className='text-gray-400'>Aprobados por todas nuestras clientas</p>
      </div>
      <div>
        <img src={assets.support_img} className='w-12 m-auto mb-5'alt="" />
        <p className='font-semibold'>Soporte al Cliente</p>
        <p className='text-gray-400'>Disponible 24/7</p>
      </div>

    </div>
  )
}

export default OurPolicy
