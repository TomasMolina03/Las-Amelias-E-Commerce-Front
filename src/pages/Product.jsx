import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {

  const {productId} = useParams();
  const {products, currency, addToCart} = useContext(ShopContext);
  const [productData,setProductData] = useState(false);
  const [image,setImage] = useState('');
  const [size,setSize] = useState('')

  const fetchProductData = async () => {

    products.map((item)=> {
      if (item._id === productId) {
        setProductData(item)
        {/* arreglar este array que no me lo toma ¿sera que analiza como misma foto?  */}
        setImage(item.image[0])
        return null;
      }
    })

  }

  useEffect(()=> {
    fetchProductData();
  },[productId, products])

  return productData ?  (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* Datos del producto xd */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* imagenes */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item,index)=>(
                <img onClick={()=>setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt="" />
          </div>
        </div>
        {/* info del producto */}
        <div className='flex-1'>
            <h1 className='font-bold text-2xl mt-2'>{productData.name}</h1>
            <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
            <p className='mt-5 md:w-4/5'>{productData.description}</p>
            <div className='flex flex-col gap-4 my-8 '>
              <p className='font-bold' >Elige el tamaño</p>
              <div className='flex gap-2'>
                {productData.sizes.map((item,index)=>(
                  <button onClick={()=> setSize(item)} className={`border border-black bg-gray-100 px-4 p-2 ${item === size ? 'border-green-500' : ''}`} key={index}>{item}</button>
                ))}
              </div>
            </div>
            <button onClick={()=>addToCart(productData._id,size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700' >AÑADIR AL CARRO</button>
            <hr className='mt-8 sm:w-4/5'/>
            <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
                <p>Producto de alta calidad rey</p>
                <p>Política de cambio los 3 primeros días</p>
            </div>

           {/* review y descripcion loco */}
            <div className='mt-20'>
                <div className='flex'>
                  <b className='border px-5 py-3 text-sm'>Descripción</b>
                </div>
                <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, aliquam assumenda. Reiciendis, magnam reprehenderit cumque iste aliquam quo nostrum aut dolorum fugiat, magni voluptatem cum! Est, architecto aliquam. Asperiores quod consequatur at, unde quia ipsum delectus eos eligendi eveniet magnam?</p>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus quidem ex cupiditate asperiores mollitia et optio sapiente velit assumenda dolore. Consequuntur, cum praesentium necessitatibus voluptatum accusamus fugiat sapiente saepe totam commodi quos maiores, ipsam aspernatur officiis minus ea corporis earum.</p>
                </div>
            </div>
         </div>
      </div>

      {/* prods relacionados */}  
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : <div className='opacity-0' ></div>
}

export default Product

