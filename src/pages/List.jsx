import { useEffect, useState } from "react";
import axios from "axios";

const List = () => {
  const [products, setProducts] = useState([]); // Estado para almacenar los productos
  const [loading, setLoading] = useState(true); // Estado para mostrar un spinner
  const [error, setError] = useState(null); // Estado para manejar errores

  // Obtener los productos al cargar la página
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/products");
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Error al cargar los productos");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Función para eliminar un producto
  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este producto?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:4000/products/${id}`);
      // Actualizar la lista después de eliminar
      setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));
      alert("Producto eliminado con éxito");
    } catch (err) {
      console.error(err);
      alert("Hubo un error al eliminar el producto");
    }
  };

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Productos</h1>
      {products.length === 0 ? (
        <p>No hay productos disponibles.</p>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Imagen</th>
              <th className="border border-gray-300 px-4 py-2">Nombre</th>
              <th className="border border-gray-300 px-4 py-2">Descripción</th>
              <th className="border border-gray-300 px-4 py-2">Precio</th>
              <th className="border border-gray-300 px-4 py-2">Categoría</th>
              <th className="border border-gray-300 px-4 py-2">Subcategoría</th>
              <th className="border border-gray-300 px-4 py-2">Talles</th>
              <th className="border border-gray-300 px-4 py-2">Color</th>
              <th className="border border-gray-300 px-4 py-2">Stock</th>
              <th className="border border-gray-300 px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-100">
                {/* Imagen del producto */}
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {product.image && product.image.length > 0 ? (
                    <img
                      src={product.image[0]} // Mostrar la primera imagen
                      alt={product.name}
                      className="w-16 h-16 object-cover mx-auto"
                    />
                  ) : (
                    <p className="text-gray-500 italic">Sin imagen</p>
                  )}
                </td>

                {/* Detalles del producto */}
                <td className="border border-gray-300 px-4 py-2">{product.name}</td>
                <td className="border border-gray-300 px-4 py-2">{product.description}</td>
                <td className="border border-gray-300 px-4 py-2">${product.price}</td>
                <td className="border border-gray-300 px-4 py-2">{product.category}</td>
                <td className="border border-gray-300 px-4 py-2">{product.subCategory}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {product.sizes && product.sizes.length > 0
                    ? product.sizes.join(", ")
                    : "Sin talles"}
                </td>
                <td className="border border-gray-300 px-4 py-2">{product.colour || "N/A"}</td>
                <td className="border border-gray-300 px-4 py-2">{product.stock || 0}</td>

                {/* Botón para eliminar */}
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default List;
