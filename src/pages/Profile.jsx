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
    <div className="profile-container">
      <h2>Perfil</h2>
      <form onSubmit={handleSubmit} className="profile-form">
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Apellido:</label>
          <input
            type="text"
            name="surname"
            value={userData.surname}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Teléfono:</label>
          <input
            type="text"
            name="mobileNumber"
            value={userData.mobileNumber}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Dirección:</label>
          <input
            type="text"
            name="address"
            value={userData.address}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
          />
        </div>
        <div className="profile-actions">
          <button type="submit">Guardar cambios</button>
        </div>
      </form>

      <div className="profile-delete">
        <button onClick={handleDeleteAccount}>Eliminar cuenta</button>
      </div>
    </div>
  );
};

export default Profile;
