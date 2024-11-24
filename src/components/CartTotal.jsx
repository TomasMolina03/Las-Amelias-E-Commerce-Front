import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
  const productTotal = getCartAmount(); // Obtener solo el total de los productos
  const totalWithShipping = productTotal + delivery_fee; // Sumar el costo de envío

  return (
    <div className='w-full'>
      <div className='text-2xl'>
        <Title text1={'TOTAL'} text2={'A PAGAR'} />
      </div>
      <div className='flex flex-col gap-2 mt-2 text-sm'>
        <div className='flex justify-between'>
          <p>Subtotal</p>
          <p>{currency}{productTotal}</p> {/* Solo el total de los productos */}
        </div>
        <hr />
        <div className='flex justify-between'>
          <p>Costo de Envío</p>
          <p>{currency}{delivery_fee}</p> {/* Mostrar el costo de envío por separado */}
        </div>
        <hr />
        <div className='flex justify-between'>
          <b>Monto Total</b>
          <b>{currency}{totalWithShipping}</b> {/* Total con envío */}
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
