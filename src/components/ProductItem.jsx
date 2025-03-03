import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProductItem = ({ id, image, name, price }) => {
    return (
        <Link to={`/product/${id}`} className="block border p-4 flex flex-col items-center group hover:shadow-lg transition-shadow duration-300">
            <div className="w-full h-56 overflow-hidden mb-4">
                {image && image.length > 0 ? (
                    <img
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        src={image[0].url}
                        alt={image[0].alt || name}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <span className="text-gray-500">Imagen no disponible</span>
                    </div>
                )}
            </div>
            <p className="text-lg font-semibold">{name}</p>
            <p className="text-sm text-gray-500">${price}</p>
        </Link>
    );
};

ProductItem.propTypes = {
    id: PropTypes.string.isRequired,
    image: PropTypes.arrayOf(
        PropTypes.shape({
            url: PropTypes.string.isRequired,
            alt: PropTypes.string,
        })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
};

export default ProductItem;
