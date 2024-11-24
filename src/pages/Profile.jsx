import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
  const [userData, setUserData] = useState({
    name: '',
    surname: '',
    mobileNumber: '',
    address: '',
    password: '',
    email: ''
  });

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
      setUserData(user);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = userData._id;

    try {
      const response = await axios.put(`http://localhost:4000/users/${userId}`, userData);
      if (response.status === 200) {
        toast.success('Datos actualizados exitosamente');
        sessionStorage.setItem('user', JSON.stringify(userData));
      }
    } catch (error) {
      toast.error('Error al actualizar los datos');
    }
  };

  const handleDeleteAccount = async () => {
    const userId = userData._id;
    const confirmDelete = window.confirm('¿Estás seguro de que quieres eliminar tu cuenta?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:4000/users/${userId}`);
        sessionStorage.removeItem('user');
        window.location.pathname = '/';
        toast.success('Cuenta eliminada exitosamente');
      } catch (error) {
        toast.error('Error al eliminar la cuenta');
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-8 my-8">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Perfil</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col">
          <label className="text-gray-600 font-medium">Nombre:</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-gray-600 font-medium">Apellido:</label>
          <input
            type="text"
            name="surname"
            value={userData.surname}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-gray-600 font-medium">Teléfono:</label>
          <input
            type="text"
            name="mobileNumber"
            value={userData.mobileNumber}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-600 font-medium">Dirección:</label>
          <input
            type="text"
            name="address"
            value={userData.address}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-600 font-medium">Contraseña:</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-center">
          <button type="submit" className="bg-blue-500 text-white rounded-lg py-2 px-6 w-full mt-6 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Guardar cambios
          </button>
        </div>
      </form>

      <div className="flex justify-center mt-6">
        <button
          onClick={handleDeleteAccount}
          className="bg-red-500 text-white rounded-lg py-2 px-6 w-full mt-6 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Eliminar cuenta
        </button>
      </div>
    </div>
  );
};

export default Profile;
