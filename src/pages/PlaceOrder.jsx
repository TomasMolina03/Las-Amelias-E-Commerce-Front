import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/user/assets'
import { ShopContext } from '../context/ShopContext'

const PlaceOrder = () => {

  const [method,setMethod] = useState('cod');
  const {navigate} = useContext(ShopContext);

  return (
    <div className='flex flex-col sm:flex-row justify-between gap-4 sm:pt-14 min-h-[80hv] border-t'>
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        {/* parte iz */}
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'INFORMACION DE'} text2={'ENVIO'} />
        </div>
        <div className='flex gap-3'>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Nombre'  required/>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Apellido' required/>
        </div>
        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='email@gmail.com' required/>
        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Calle' required />
        <div className='flex gap-3'>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Localidad' required/>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Provincia' required/>
        </div>
        <div className='flex gap-3'>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Código Postal ' required/>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='País' required/>
        </div>
        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Número Telefónico' required/>
      </div>
      {/* Parte derecha del chjeckout */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>
        <div className='mt-12'>
          <Title text1={'METODO DE'} text2={'PAGO'} />
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={()=>setMethod('mercadopago')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'mercadopago' ? 'bg-green-400' : '' } `} ></p>
              <img className='h-14 m-2 ' src={assets.mercado_pago} alt="" />
            </div>
          </div>

          <div className='w-full text-center mt-8'>
            <button onClick={()=>navigate('/orders')} className='bg-black text-white px-16 py-3 text-sm'> PAGAR </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder
