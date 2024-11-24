import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Login = () => {
  const [currentState, setCurrentState] = useState('Registrarse');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Verificar si ya hay un usuario autenticado en localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const onSumbmitHandler = (event) => {
    event.preventDefault();
    if (currentState === 'Registrarse') {
      register(event);
    } else {
      login(event);
    }
  };

  const register = async (e) => {
    e.preventDefault();

    const name = document.getElementById('nameRegister').value;
    const surname = document.getElementById('surnameRegister').value;
    const email = document.getElementById('emailRegister').value;
    const mobileNumber = document.getElementById('mobileNumberRegister').value;
    const address = document.getElementById('addressRegister').value;
    const password = document.getElementById('passwordRegister').value;

    try {
      const response = await axios.get('http://localhost:4000/users');
      const users = response.data;
      const userRegistered = users.find(user => user.email === email);

      if (userRegistered) {
        toast.error("Ya se registró una cuenta con este correo.");
      } else {
        await axios.post('http://localhost:4000/users', {
          email,
          password,
          name,
          address,
          mobileNumber,
          surname,
          role: 'user', // Asignar rol por defecto
        });
        toast.success("Cuenta creada exitosamente. Inicie sesión para comprar.");
        document.getElementById('formRegister').reset();
      }
    } catch (error) {
      toast.error("Error al crear la cuenta.");
    }
  };

  const login = async (e) => {
    e.preventDefault();
  
    const email = document.getElementById('emailRegister').value;
    const password = document.getElementById('passwordRegister').value;
  
    try {
      const response = await axios.get('http://localhost:4000/users');
      const users = response.data;
      const userValid = users.find(user => user.email === email && user.password === password);
  
      if (!userValid) {
        toast.error("Email y/o contraseña incorrectos!");
      } else {
        // Guardar en sessionStorage
        sessionStorage.setItem('user', JSON.stringify(userValid));
  
        toast.success("Inicio de sesión exitoso");
        // Redirigir según el rol del usuario
        if (userValid.role === "admin") {
          window.location.pathname = '/panelAdm/*';
        } else {
          window.location.pathname = '/';
        }
      }
    } catch (error) {
      toast.error("Error al iniciar sesión.");
    }
  };
  
  const handleLogout = () => {
    sessionStorage.removeItem('user'); // Eliminar usuario de sessionStorage
    setIsLoggedIn(false); // Actualizar estado local
    toast.success("Sesión cerrada exitosamente.");
  };

  return (
    <>
        <form
          id="formRegister"
          onSubmit={onSumbmitHandler}
          className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
        >
          <div className="inline-flex items-center gap-2 mb-2 mt-10">
            <p className="text text-3xl">{currentState}</p>
            <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
          </div>

          {currentState === 'Registrarse' && (
            <>
              <input type="text" id="nameRegister" className="w-full px-3 py-2 border border-l-gray-800" placeholder="Nombre" required />
              <input type="text" id="surnameRegister" className="w-full px-3 py-2 border border-l-gray-800" placeholder="Apellidos" required />
              <input type="number" id="mobileNumberRegister" className="w-full px-3 py-2 border border-l-gray-800" placeholder="Teléfono" required />
              <input type="text" id="addressRegister" className="w-full px-3 py-2 border border-l-gray-800" placeholder="Dirección (Tucumán)" required />
            </>
          )}

          <input type="email" id="emailRegister" className="w-full px-3 py-2 border border-l-gray-800" placeholder="Email" required />
          <input type="password" id="passwordRegister" className="w-full px-3 py-2 border border-l-gray-800" placeholder="Contraseña" required />

          <div className="w-full flex justify-between text-sm mt-[-8px]">
            <p className="cursor-pointer">Olvidé mi contraseña</p>
            {currentState === 'Iniciar Sesion' ? (
              <p onClick={() => setCurrentState('Registrarse')} className="cursor-pointer"> Crear Cuenta</p>
            ) : (
              <p onClick={() => setCurrentState('Iniciar Sesion')} className="cursor-pointer"> Iniciar Sesión</p>
            )}
          </div>

          <button type="submit" className="bg-black text-white font-light px-8 py-2 mt-4">
            {currentState === 'Iniciar Sesion' ? 'Confirmar' : 'Registrarse'}
          </button>
          <ToastContainer />
        </form>
    </>
  );
};

export default Login;
