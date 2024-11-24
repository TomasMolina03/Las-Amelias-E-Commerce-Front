import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const [products, setProducts] = useState([]); // Guardamos los productos del backend
    const [cartItems, setCartItems] = useState({});
    const [currency] = useState('$');
    const [delivery_fee] = useState(1000);
    const navigate = useNavigate();

  // Obtener productos desde el backend
    useEffect(() => {
    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:4000/products');
            const data = await response.json();
            setProducts(data); // Guardamos los productos obtenidos
        }catch (error) {
            console.error('Error al cargar los productos:', error);
        }
    };
    fetchProducts(); // Llamada a la API para obtener productos
    }, []);

    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error('Selecciona un tamaño');
            return;
        }

        // Copiar el carrito actual
        let cartData = structuredClone(cartItems);
        toast
        // Verificar si el producto ya está en el carrito
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                // Si el tamaño ya existe, incrementar la cantidad
                cartData[itemId][size] += 1;
            } else {
                // Si el tamaño no existe, agregarlo con cantidad 1
                cartData[itemId][size] = 1;
            }
        } else {
            // Si el producto no está en el carrito, agregarlo con el tamaño y cantidad 1
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
    }

    // Actualizar el estado con el carrito actualizado
    setCartItems(cartData);
    };

    const getCartAmount = () => {
        let totalAmount = 0;

    // Calcular el total de los productos en el carrito
    for (const itemId in cartItems) {
        const itemInfo = products.find((product) => product._id === itemId);

        if (itemInfo) {
            for (const size in cartItems[itemId]) {
                const quantity = cartItems[itemId][size];
                if (quantity > 0) {
                    totalAmount += itemInfo.price * quantity;
                }
            }
        }
    }

    return totalAmount; // Solo retorna el total de los productos sin el envío
};



    const getCartCount = () => {
        let totalCount = 0;
        for (const itemId in cartItems) {
            for (const size in cartItems[itemId]) {
                const quantity = cartItems[itemId][size];
                if (quantity > 0) {
                    totalCount += quantity;
                }
            }
        }
    return totalCount;
    };

const updateQuantity = (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        if (quantity === 0) {
            delete cartData[itemId][size]; // Si la cantidad es 0, eliminar el producto del carrito
        if (Object.keys(cartData[itemId]).length === 0) {
            delete cartData[itemId]; // Si no quedan tamaños de este producto, eliminar el producto
        }
    } else {
      cartData[itemId][size] = quantity; // Actualizar la cantidad
    }
    setCartItems(cartData);
};

const value = {
    products,
    currency,
    delivery_fee,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    setCartItems
};

return (
    <ShopContext.Provider value={value}>
        {props.children}
    </ShopContext.Provider>
    );
};

export default ShopContextProvider;
