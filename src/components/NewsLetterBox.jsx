import React from 'react'

function NewsLetterBox() {

    const onSumbmitHandler = (event) => {
        event.preventDefault();
    }

  return (
    <div className='text-center '>
      <p className='text-2xl font-medium text-gray-800'>¡Suscribete a nuestro Correo!</p>
      <p className='text-gray-400 mt-3'>
        🎊 Podrás enterarte de nuestras promociones y obtener cupones 🎊
      </p>
      <form onSubmit={onSumbmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
            <input className='w-full sm:flex-1 outline-none'  type="email" placeholder='pepe123@gmail.com' required />
            <button type='submit' className='bg-black text-white text-xs px-10 py-4'>ENVIAR</button>
      </form>
    </div>
  )
}

export default NewsLetterBox
