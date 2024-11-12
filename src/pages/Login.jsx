import React, { useState } from 'react'

const Login = () => {

  const [currentState, setCurrentState] = useState('Registrarse');

  const onSumbmitHandler = async(event) => {
    event.preventDefault();
  }

  return (
    <form onSubmit={onSumbmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800 '>
      <div className='inline-flex items-center gap-2 mb-2 mt-10 '>
        <p className='text text-3xl' >{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800'/>
      </div>
      {currentState === 'Iniciar Sesion' ? '' : <input type="text" className='w-full px-3 py- border border-l-gray-800' placeholder='Nombre' required />}
      <input type="email" className='w-full px-3 py- border border-l-gray-800' placeholder='Email' required/>
      <input type="password" className='w-full px-3 py- border border-l-gray-800' placeholder='Contraseña' required/>
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Olvidé mi contraseña</p>
        {
          currentState === 'Iniciar Sesion'
          ? <p onClick={()=> setCurrentState('Registrarse')} className='cursor-pointer'> Crear Cuenta</p>
          : <p onClick={()=> setCurrentState('Iniciar Sesion')} className='cursor-pointer'> Iniciar Sesión</p>
        }
      </div>
      <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState === 'Iniciar Sesion' ? 'Confirmar' : 'Registrarse' }</button>
    </form>
  )
}

export default Login

