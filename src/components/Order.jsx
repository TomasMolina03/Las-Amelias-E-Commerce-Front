import React, { useState, useContext, useEffect } from "react";
import { ShopContext } from '../context/ShopContext';
import CartTotal from "./CartTotal";


const Order = () => {

  const {products,currency,cartItems,delivery_fee,getCartAmount} = useContext(ShopContext);

  const [order, setOrder] = useState([])

  useEffect(()=>{
    const tempData = [];
    for(const items in cartItems){
      for(const item in cartItems[items]){
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item]
          })
        }
      }
    }
    setOrder(tempData);
  },[cartItems])
  return (
    <div>
      <div>
        {
          order.map((item,index)=>{
            const orderData = products.find((product)=> product._id === item._id);

            return (
              <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:frid-cols-[4fr-2fr_0.5fr] items-center gap-4' > 
                <div className='flex items-start gap-6'>
                  <img className='w-16 sm:w-20' src={orderData.image[0]} alt="" />
                  <div>
                    <p className='text-xs sm:text-lg text-gray-800' >{orderData.name}</p>
                    <div className='flex items-center gap-5 mt-2'>
                      <p>{currency}{orderData.price}</p>
                      <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
      <p>Envio: ${delivery_fee}</p>
      <p>Total: {currency}{getCartAmount()}</p>
    </div>
  )
}

export default Order