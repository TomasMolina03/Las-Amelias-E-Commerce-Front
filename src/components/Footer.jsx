import React from 'react'
import { assets } from '../assets/user/assets'

function Footer() {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

        <div>
            <img src={assets.logo} className="mb-5 w-32 " alt="" />
            <p className='w-full md:w-2/3  text-gray-600'>
            Las Amelias nació de la visión de una persona apasionada por la moda femenina, dedicada a ofrecer remeras de alta calidad para mujeres que buscan estilo y autenticidad.
            </p>
        </div>

        <div>
            <p className='text-xl font-medium  mb-5'>Empresa</p>
            <ul className='flex flex-col gap-1  text-gray-600'>
                <li>INICIO</li>
                <li>SOBRE NOSOTROS</li>
                <li>ENVÍOS</li>
                <li>POLITICA DE PRIVACIDAD</li>
            </ul>
        </div>
        <div>
          <p className='text-xl font-medium mb-5'>CONTACTANOS</p>
          <ul className='flex flex-col gap-1  text-gray-600'>
            <li>+XXXX-XXXXXX</li>
            <li>contact@gmail.com</li>
          </ul>
        </div>

      </div>
        <div>
          <hr />
          <p className='py-5 text-sm text-center'>Copyright 2024@LasAmelias.com - Todos los derechos reservados</p>
        </div>
    </div>
  )
}

export default Footer
