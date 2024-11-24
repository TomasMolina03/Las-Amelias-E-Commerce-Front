import { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import Order from '../components/Order';
import axios from 'axios';

const Orders = () => {
  const { currency } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
      const url = `http://localhost:4000/orders/user/${user._id}`; // Cambia esta ruta según tu configuración de backend

      axios.get(url)
        .then(response => {
          setOrders(response.data); // Establecer las órdenes en el estado
          setLoading(false);
        })
        .catch(error => {
          console.error("Error al obtener las órdenes", error);
          setLoading(false);
        });
    }
  }, []);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <h1>Mis Órdenes</h1>
        {loading ? (
          <p>Cargando tus órdenes...</p>
        ) : (
          <Order orders={orders} currency={currency} />
        )}
      </div>
    </div>
  );
};

export default Orders;
