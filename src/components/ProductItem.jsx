import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {
    return (
        <Link to={`/product/${id}`} className="block border p-4 flex flex-col items-center group hover:shadow-lg transition-shadow duration-300">
            {/* Contenedor de la imagen con clases para aplicar hover */}
            <div className="w-full h-56 overflow-hidden mb-4">
                <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    src={image[0]} // Usando la primera imagen del array
                    alt={name}
                />
            </div>
            <p className="text-lg font-semibold">{name}</p>
            <p className="text-sm text-gray-500">${price}</p>
        </Link>
    );
};

export default ProductItem;
