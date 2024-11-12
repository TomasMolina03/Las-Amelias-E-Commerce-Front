import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';

const Orders = () => {

  const { products, currency} = useContext(ShopContext);

  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1={'MIS'} text2={'PEDIDOS'} />
      </div>
      
    </div>
  )
}

export default Orders
