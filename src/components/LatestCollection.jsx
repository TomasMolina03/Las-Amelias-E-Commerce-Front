import { useEffect, useState } from 'react';
import axios from 'axios';
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:4000/products'); // Ruta para obtener productos
                // Filtrar productos con al menos una unidad en stock
                const filteredProducts = response.data.filter(item => item.stock > 0);
                setLatestProducts(filteredProducts.slice(0, 10)); // Solo los primeros 10 productos disponibles
            } catch (error) {
                console.error('Error al obtener los productos:', error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="my-10">
            <div className="text-center py-8 text-3xl">
                <Title text1={'ULTIMAS'} text2={'COLECCIONES'} />
                <p className="w-3/4 m-auto text-sm sm:text-sm md:text-base text-gray-600">
                    Remeras de esta última temporada listas para hacerte sentir como una diosa
                </p>
            </div>

            {/* Mostrar los productos */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                {latestProducts.map((item, index) => (
                    <ProductItem
                        key={index}
                        id={item._id}
                        image={item.image}
                        name={item.name}
                        price={item.price}
                    />
                ))}
            </div>
        </div>
    );
};

export default LatestCollection;
