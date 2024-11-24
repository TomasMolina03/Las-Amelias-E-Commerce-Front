import { useEffect, useState } from 'react';
import axios from 'axios';
import Title from '../components/Title';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'completed', 'paid'

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:4000/orders'); // Verifica la URL
        console.log(response.data); // Verifica la estructura de las órdenes
        setOrders(response.data);
      } catch (error) {
        console.error('Error al obtener las órdenes:', error);
      }
    };
    fetchOrders();
  }, []);

  // Filtrar las órdenes según el estado
  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    return order.status === filter;
  });

  // Función para actualizar el estado de la orden a "Pagado"
  const handleMarkAsPaid = async (orderId) => {
    try {
      const response = await axios.put(`http://localhost:4000/orders/${orderId}`, { status: 'Pagado' });
      setOrders(orders.map(order => 
        order._id === orderId ? { ...order, status: 'Pagado' } : order
      ));
      console.log('Estado actualizado a "Pagado":', response.data);
    } catch (error) {
      console.error('Error al cambiar el estado de la orden:', error);
    }
  };

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1="MIS" text2="PEDIDOS" />
      </div>

      {/* Filtro de órdenes */}
      <div className="flex gap-4 mb-4">
        <button 
          className={`px-4 py-2 border rounded ${filter === 'all' ? 'bg-black text-white' : ''}`}
          onClick={() => setFilter('all')}
        >
          Todas
        </button>
        <button 
          className={`px-4 py-2 border rounded ${filter === 'Pendiente' ? 'bg-black text-white' : ''}`}
          onClick={() => setFilter('Pendiente')}
        >
          Pendientes
        </button>
        <button 
          className={`px-4 py-2 border rounded ${filter === 'Completado' ? 'bg-black text-white' : ''}`}
          onClick={() => setFilter('Completado')}
        >
          Completadas
        </button>
        <button 
          className={`px-4 py-2 border rounded ${filter === 'Pagado' ? 'bg-black text-white' : ''}`}
          onClick={() => setFilter('Pagado')}
        >
          Pagadas
        </button>
      </div>

      {/* Lista de órdenes */}
      <div className="flex flex-col gap-4">
        {filteredOrders.map(order => {
          console.log(order); // Esto muestra la estructura de cada orden
          return (
            <div key={order._id} className="p-4 border rounded shadow-md">
              <p><strong>ID de Orden:</strong> {order._id}</p>

              {/* Verifica si user existe y accede a los campos correspondientes */}
              <p><strong>Cliente:</strong> {order.user ? `${order.user.name} ${order.user.surname}` : 'Nombre no disponible'}</p> 

              <p><strong>Fecha:</strong> {new Date(order.date).toLocaleDateString()}</p>
              
              <p><strong>Productos:</strong></p>
              <ul className="ml-4 list-disc">
                {order.products.map((product, index) => {
                  const productName = product.product ? product.product.name : 'Nombre no disponible';
                  const productPrice = product.product ? product.product.price : 'N/A';
                  const productQuantity = product.quantity || 0;

                  return (
                    <li key={index}>
                      Producto: {productName} - Cantidad: {productQuantity} - Precio: ${productPrice}
                    </li>
                  );
                })}
              </ul>

              <p><strong>Total:</strong> ${order.totalAmount}</p>
              <p><strong>Estado:</strong> {order.status}</p>

              {/* Botón para cambiar el estado de "Pendiente" a "Pagado" */}
              {order.status === 'Pendiente' && (
                <button 
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                  onClick={() => handleMarkAsPaid(order._id)}
                >
                  Marcar como Pagado
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
