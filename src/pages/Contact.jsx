import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/user/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'ESTAMOS'} text2={'A TU DISPOSICION'} />
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Nuestras Tienda</p>
          <p className='text-gray-500'>Tucumán, San Miguel de Tucumán, Argentina <br /> Calle XXX, Local 999 </p> 
          <p className='text-gray-500'>Whatsapp: (XXX) XXXXXXX</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500' > Llámanos</button>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  )
}

export default Contact

