import { useContext, useState, useEffect } from 'react';
import { assets } from '../assets/user/assets';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null); // Estado para almacenar el ID del usuario
  const { setShowSearch, getCartCount } = useContext(ShopContext);

  // Verificar si el usuario está logueado y obtener el ID desde sessionStorage
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
      setIsLoggedIn(true);
      setUserId(user._id); // Guardar el ID del usuario en el estado
    } else {
      setIsLoggedIn(false);
      setUserId(null);
    }
  }, []);

  // Función para cerrar sesión
  const handleLogout = () => {
    sessionStorage.removeItem('user'); // Eliminar usuario de sessionStorage
    setIsLoggedIn(false); // Actualizar estado local
    setUserId(null); // Limpiar el ID del usuario
  };

  return (
    <div className='flex items-center justify-between py-5 font-medium'>
      <Link to='/'><img src={assets.logo} alt="Company Logo" className="w-36" /></Link>

      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        <NavLink to='/' className='flex flex-col items-center gap-1'>
          <p>INICIO</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/collection' className='flex flex-col items-center gap-1'>
          <p>COLECCION</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/about' className='flex flex-col items-center gap-1'>
          <p>SOBRE NOSOTROS</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/contact' className='flex flex-col items-center gap-1'>
          <p>CONTACTANOS</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
      </ul>

      <div className='flex items-center gap-6'>
        <img onClick={() => setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer' alt="" />

        {isLoggedIn ? (
          <>
            <div className='group relative'>
              <Link to={`/profile/${userId}`}>
                <img className='w-5 cursor-pointer' src={assets.profile_icon} alt="Perfil" />
              </Link>
              <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                  <Link to={`/profile/${userId}`} className='cursor-pointer hover:text-black'>Perfil</Link>
                  <Link to={`/orders/${userId}`} className='cursor-pointer hover:text-black'>Órdenes</Link>

                  <Link to='/' className='cursor-pointer hover:text-black' onClick={handleLogout}>Cerrar sesión</Link>
                </div>
              </div>
            </div>

            <Link to='/cart' className='relative'>
              <img src={assets.cart_icon} className='w-5 min-w-5' alt="Carrito" />
              <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
            </Link>
          </>
        ) : (
          <div className='group relative'>
            <Link to='/login'>ACCEDER</Link>
          </div>
        )}

        <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="Menú" />
      </div>

      {/* Menú desplegable para pantallas pequeñas */}
      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
        <div className='flex flex-col text-gray-600'>
          <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
            <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="Atrás" />
            <p>Atrás</p>
          </div>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/'>INICIO</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/collection'>COLECCION</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/about'>SOBRE NOSOTROS</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/contact'>CONTACTANOS</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
