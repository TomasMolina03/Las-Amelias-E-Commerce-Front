import { useEffect, useState } from 'react';
import axios from 'axios';
import Title from '../components/Title';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all' o 'pending'

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:4000/orders'); // Asegúrate de que esta URL sea correcta
        setOrders(response.data);
      } catch (error) {
        console.error('Error al obtener las órdenes:', error);
      }
    };
    fetchOrders();
  }, []);

  // Filtrar las órdenes
  const filteredOrders = filter === 'pending' 
    ? orders.filter(order => order.status === 'pending') 
    : orders;

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1="MIS" text2="PEDIDOS" />
      </div>

      {/* Filtro */}
      <div className="flex gap-4 mb-4">
        <button 
          className={`px-4 py-2 border rounded ${filter === 'all' ? 'bg-black text-white' : ''}`}
          onClick={() => setFilter('all')}
        >
          Todas
        </button>
        <button 
          className={`px-4 py-2 border rounded ${filter === 'pending' ? 'bg-black text-white' : ''}`}
          onClick={() => setFilter('pending')}
        >
          Pendientes
        </button>
      </div>

      {/* Lista de órdenes */}
      <div className="flex flex-col gap-4">
        {filteredOrders.map(order => (
          <div key={order._id} className="p-4 border rounded shadow-md">
            <p><strong>ID de Orden:</strong> {order._id}</p>
            <p><strong>Cliente:</strong> {order.user.name}</p> {/* Aquí se asume que tienes un campo 'name' en el usuario */}
            <p><strong>Fecha:</strong> {new Date(order.date).toLocaleDateString()}</p>
            
            <p><strong>Productos:</strong></p>
            <ul className="ml-4 list-disc">
              {order.products.map((product, index) => (
                <li key={index}>
                  {/* Aquí puedes agregar más detalles si necesitas, como la referencia a 'product' */}
                  Producto ID: {product.product} - Cantidad: {product.quantity}
                </li>
              ))}
            </ul>

            <p><strong>Total:</strong> ${order.totalAmount}</p>
            <p><strong>Estado:</strong> {order.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
