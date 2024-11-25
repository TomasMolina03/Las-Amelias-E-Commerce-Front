import React from "react";
import axios from "axios";
import { jsPDF } from "jspdf";

const Order = ({ orders, currency, setOrders }) => {
  // Función para manejar el cambio de estado de "Pagado" a "Completado"
  const handleOrderCompletion = async (orderId) => {
    try {
      const response = await axios.put(`http://localhost:4000/orders/${orderId}`, { status: 'Completado' });
      setOrders(orders.map(order => 
        order._id === orderId ? { ...order, status: 'Completado' } : order
      ));
      console.log('Estado actualizado a "Completado":', response.data);
      window.location.reload();
    } catch (error) {
      console.error('Error al cambiar el estado de la orden:', error);
    }
  };

  // Función para generar un PDF con los datos de la orden en el formato solicitado
  const generarTicketPDF = (order) => {
    const doc = new jsPDF();

    // Títulos principales
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("Las Amelias", 105, 20, { align: "center" });
    doc.setFontSize(18);
    doc.text("Ticket de compra", 105, 30, { align: "center" });

    // Detalles
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.text("Detalles", 20, 50);
    doc.text(`Número de orden: #${order.id}`, 20, 60);

    // Productos
    doc.text("Productos:", 20, 70);
    let yOffset = 80;
    order.products.forEach((product) => {
      doc.text(`- ${product.name} (x${product.quantity}): ${currency}${product.subtotal}`, 20, yOffset);
      yOffset += 10;
    });

    // Total y fecha
    yOffset += 10; // Espacio adicional
    doc.text(`Total: ${currency}${order.totalAmount}`, 20, yOffset);
    yOffset += 10;
    doc.text(`Fecha de la compra: ${new Date(order.date).toLocaleDateString()}`, 20, yOffset);

    // Nota final
    yOffset += 20; // Espacio antes de la nota
    doc.setFontSize(10);
    doc.text(
      "Cambio directo solo hasta tres días después de haber recibido el producto.\nMuchas gracias por su compra. Esperamos que la disfrutes.",
      20,
      yOffset
    );

    // Guardar el PDF
    doc.save(`ticket_orden_${order.id}.pdf`);
  };

  if (!orders || orders.length === 0) {
    return <p>No tienes órdenes.</p>; // Mensaje en caso de que no haya órdenes
  }

  return (
    <div>
      {orders.map((order) => (
        <div
          key={order._id}
          style={{ border: "1px solid #ccc", margin: "20px", padding: "10px" }}
        >
          <h3>Orden #{order.id}</h3>
          <p>Estado: {order.status}</p>
          <p>Fecha: {new Date(order.date).toLocaleDateString()}</p>
          <p>Total: {currency}{order.totalAmount}</p>

          <h4>Productos:</h4>
          <div>
            {order.products && order.products.length > 0 ? (
              order.products.map((product, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: "100px",
                      height: "100px",
                      marginRight: "10px",
                      objectFit: "cover",
                    }}
                  />
                  <div>
                    <p>
                      <strong>Nombre:</strong> {product.name}
                    </p>
                    <p>
                      <strong>Cantidad:</strong> {product.quantity}
                    </p>
                    <p>
                      <strong>Subtotal:</strong> {currency}{product.subtotal}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>No hay productos en esta orden.</p>
            )}
          </div>

          {/* Botón para marcar como "Recibí mi compra" */}
          {order.status === "Pagado" && (
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => handleOrderCompletion(order.id)}
            >
              Recibí mi compra
            </button>
          )}

          {/* Botón para generar el ticket PDF */}
          {(order.status === "Pagado" || order.status === "Completado") && (
            <button
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 ml-4"
              onClick={() => generarTicketPDF(order)}
            >
              Generar Ticket PDF
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Order;
