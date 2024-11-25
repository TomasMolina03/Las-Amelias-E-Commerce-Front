import { useContext, useState } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/user/assets';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const [view, setView] = useState('default'); // Manejar vistas: 'default', 'transfer', 'confirmation'
  const { cartItems, products, getCartAmount, setCartItems, delivery_fee, navigate } = useContext(ShopContext);

  const handleMarkAsPaid = async () => {
    try {
      // Verificar si hay un usuario logueado
      const user = JSON.parse(sessionStorage.getItem('user'));
  
      if (!user) {
        alert("Debes iniciar sesión para realizar una compra.");
        navigate('/login');
        return;
      }
  
      // Preparar la lista de productos para la orden
      const orderProducts = [];
      for (const itemId in cartItems) {
        const item = products.find((product) => product._id === itemId);
  
        if (item) {
          for (const size in cartItems[itemId]) {
            orderProducts.push({
              product: item._id, // Referencia al producto
              quantity: cartItems[itemId][size], // Cantidad del producto
            });
          }
        }
      }
  
      // Verifica el stock de los productos antes de continuar
      for (const itemId in cartItems) {
        const item = products.find((product) => product._id === itemId);
  
        if (item) {
          for (const size in cartItems[itemId]) {
            const quantityInCart = cartItems[itemId][size];
            if (quantityInCart > item.stock) {
              alert(`No hay suficiente stock del producto ${item.name} para la cantidad seleccionada.`);
              return;
            }
          }
        }
      }
  
      const orderData = {
        user: user._id, // ID del usuario logueado
        products: orderProducts,
        totalAmount: getCartAmount() + delivery_fee, // Total con el envío incluido
      };
  
      // Enviar la solicitud para crear la orden
      const response = await axios.post('http://localhost:4000/orders', orderData);
  
      if (response.status === 201) {
        // Actualizar el stock de cada producto
        for (const itemId in cartItems) {
          const item = products.find((product) => product._id === itemId);
  
          if (item) {
            for (const size in cartItems[itemId]) {
              const quantityInCart = cartItems[itemId][size];
  
              // Verificar si la cantidad solicitada excede el stock disponible
              if (quantityInCart > item.stock) {
                alert(`No hay suficiente stock de ${item.name} para completar tu compra.`);
                return;
              }
  
              // Descontar el stock
              await axios.put(`http://localhost:4000/products/${itemId}`, {
                quantity: quantityInCart,  // Cantidad a restar
              });
              
            }
          }
        }
  
        // Vaciar el carrito después de realizar la compra
        setCartItems({});
  
        // Redirigir a la página de confirmación de compra
        alert('Orden realizada exitosamente');
        navigate(`/orders/${user._id}`);
      }
    } catch (error) {
      console.error('Error al marcar como pagado:', error);
      alert('Hubo un problema al procesar tu orden. Intenta nuevamente.');
    }
  };
  
  
  
  

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 sm:pt-14 min-h-[80hv] border-t">
      {view === 'default' && (
        <>
          {/* Parte izquierda */}
          <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
            <div className="text-xl sm:text-2xl my-3">
              <Title text1="INFORMACIÓN DE" text2="ENVÍO" />
            </div>
            <div className="flex gap-3">
              <input
                className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                type="text"
                placeholder="Nombre"
                required
              />
              <input
                className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                type="text"
                placeholder="Apellido"
                required
              />
            </div>
            <input
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              type="email"
              placeholder="email@gmail.com"
              required
            />
            <input
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              type="text"
              placeholder="Calle"
              required
            />
            <div className="flex gap-3">
              <input
                className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                type="text"
                placeholder="Localidad"
                required
              />
              <input
                className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                type="text"
                placeholder="Provincia"
                required
              />
            </div>
            <div className="flex gap-3">
              <input
                className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                type="number"
                placeholder="Código Postal"
                required
              />
              <input
                className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                type="text"
                placeholder="País"
                required
              />
            </div>
            <input
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              type="number"
              placeholder="Número Telefónico"
              required
            />
          </div>

          {/* Parte derecha */}
          <div className="mt-8">
            <div className="mt-8 min-w-80">
              <CartTotal />
            </div>
            <div className="mt-12">
              <Title text1="MÉTODO DE" text2="PAGO" />
              <div className="flex gap-3 flex-col lg:flex-row">
                <div
                  onClick={() => setMethod('mercadopago')}
                  className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
                >
                  <p
                    className={`min-w-3.5 h-3.5 border rounded-full ${
                      method === 'mercadopago' ? 'bg-green-400' : ''
                    }`}
                  ></p>
                  <img
                    className="h-14 m-2 "
                    src={assets.mercado_pago}
                    alt=""
                  />
                </div>

                <div
                  onClick={() => setView('transfer')} // Cambiar a la vista de transferencia
                  className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
                >
                  <p
                    className={`min-w-3.5 h-3.5 border rounded-full ${
                      method === 'transfer' ? 'bg-green-400' : ''
                    }`}
                  ></p>
                  <span className="text-sm">Transferencia Bancaria</span>
                </div>
              </div>

              <div className="w-full text-center mt-8">
                <button
                  onClick={() => navigate('/orders')}
                  className="bg-black text-white px-16 py-3 text-sm"
                >
                  PAGAR
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {view === 'transfer' && (
        <div className="flex flex-col items-center gap-4 w-full">
          <h2 className="text-2xl font-bold">Transferencia Bancaria</h2>
          <p className="text-lg">Monto a transferir: <strong>${getCartAmount() + delivery_fee}</strong></p>
          <p className="text-lg">Alias: <strong>LASAMELIAS-MERCADOPAGO</strong></p>
          <p>Realice la transferencia y luego marque como pagado.</p>
          <button
            onClick={handleMarkAsPaid}
            className="bg-green-500 text-white px-6 py-2 rounded"
          >
            Marcar como Pagado
          </button>
        </div>
      )}

      {view === 'confirmation' && (
        <div className="flex flex-col items-center gap-4 w-full">
          <h2 className="text-2xl font-bold">Solicitud en Proceso</h2>
          <p>
            Ya tienes reservado tu producto, solo falta que el comprador confirme
            el pago del mismo y será enviado.
          </p>
        </div>
      )}
    </div>
  );
};

export default PlaceOrder;
