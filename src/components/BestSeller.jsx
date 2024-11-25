import { useEffect, useState } from 'react';
import axios from 'axios';
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
    const [bestSeller, setBestSeller] = useState([]);

    useEffect(() => {
        const fetchBestSellers = async () => {
            try {
                const response = await axios.get('http://localhost:4000/products'); // Ruta para obtener productos
                // Filtrar los best sellers con al menos una unidad en stock
                const bestSellers = response.data.filter((item) => item.bestSeller && item.stock > 0);
                setBestSeller(bestSellers.slice(0, 5)); // Solo los primeros 5 best sellers disponibles
            } catch (error) {
                console.error('Error al obtener los productos:', error);
            }
        };
        fetchBestSellers();
    }, []);

    return (
        <div className="my-10">
            <div className="text-center text-3xl py-8">
                <Title text1={'MAS'} text2={'VENDIDOS'} />
                <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
                    Estos son los productos más aclamados por nuestros usuarios
                </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                {bestSeller.map((item, index) => (
                    <ProductItem
                        key={index}
                        id={item._id}
                        name={item.name}
                        image={item.image}
                        price={item.price}
                    />
                ))}
            </div>
        </div>
    );
};

export default BestSeller;
