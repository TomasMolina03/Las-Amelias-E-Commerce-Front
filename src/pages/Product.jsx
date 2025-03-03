import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import RelatedProducts from '../components/RelatedProducts';
import { ShopContext } from '../context/ShopContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Product = () => {
  const { productId } = useParams();
  const { addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginAlert, setShowLoginAlert] = useState(false);

  const fetchProductData = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/products/${productId}`);
      setProductData(response.data);
      setImage(response.data.image[0].url);
    } catch (error) {
      console.error('Error al obtener los detalles del producto:', error);
    }
  };


  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (user !== null && user !== 'null') {
      setIsLoggedIn(true);
    }
  }, []);


  useEffect(() => {
    fetchProductData();
  }, [productId]);

  const handleAddToCart = () => {
    if (isLoggedIn) {
      addToCart(productData._id, size);
    } else {
      setShowLoginAlert(true);
      toast.info('Acceda a su cuenta para añadir productos al carro');
    }
  };


  if (!productData) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
        <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
          <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
            <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
              {productData.image.map((item, index) => (
                <img
                  onClick={() => setImage(item.url)}
                  src={item.url}
                  key={index}
                  className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                />
              ))}
            </div>
            <div className="w-full sm:w-[80%]">
              <img className="w-full h-auto" src={image} alt="Imagen principal del producto" />
            </div>
          </div>

          <div className="flex-1">
            <h1 className="font-bold text-3xl mt-2">{productData.name}</h1>
            <p className="mt-5 text-3xl font-medium">Precio: ${productData.price}</p>
            <p className="mt-5 text-xl">Cantidad disponible: {productData.stock}</p>
            <p className="mt-5 text-xl">Descripción del producto:</p>
            <p>{productData.description}</p>

            <div className="flex flex-col gap-4 my-8">
              <p className="font-bold">Elige el tamaño</p>
              <div className="flex gap-2">
                {productData.sizes.map((item, index) => (
                  <button
                    onClick={() => setSize(item)}
                    className={`border border-black bg-gray-100 px-4 p-2 ${item === size ? 'border-green-500' : ''}`}
                    key={index}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>


            <button onClick={handleAddToCart} className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700">
              AÑADIR AL CARRO
            </button>

            <hr className="mt-8 sm:w-4/5" />

            <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
              <p>Producto de alta calidad rey</p>
              <p>Política de cambio los 3 primeros días</p>
            </div>
          </div>
        </div>

        <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
      </div>

      {showLoginAlert}
    </div>
  );
};

export default Product;
