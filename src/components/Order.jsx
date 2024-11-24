import React from "react";

const Order = ({ orders, currency }) => {
  if (!orders || orders.length === 0) {
    return <p>No tienes órdenes.</p>; // Mensaje en caso de que no haya órdenes
  }

  return (
    <div>
      {orders.map((order, index) => (
        <div key={index}>
          <p>Orden #{order._id}</p>
          
          {/* Muestra detalles de los productos si 'order.products' es un arreglo */}
          <div>
            {order.products && order.products.length > 0 ? (
              order.products.map((product, idx) => (
                <div key={idx}>
                  <p>Cantidad: {product.quantity}</p> {/* Asumiendo que cada producto tiene una cantidad */}
                </div>
              ))
            ) : (
              <p>No hay productos en esta orden.</p>
            )}
          </div>

          <p>Total: {currency}{order.totalAmount}</p>
        </div>
      ))}
    </div>
  );
};

export default Order;
