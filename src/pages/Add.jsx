import { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Add = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const decoded = jwtDecode(token);
      if (decoded.role !== 'admin') {
        navigate('/');
      } else {
        setIsAdmin(true);
      }
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      navigate('/login');
    }
  }, [navigate]);

  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [image3, setImage3] = useState('');
  const [image4, setImage4] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Remeras');
  const [subCategory, setSubCategory] = useState('Unicas');
  const [bestSeller, setBestSeller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [colour, setColour] = useState('');
  const [stock, setStock] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem(`token`);

    if(!token) {
      alert('No tienes permisos para realizar esta acción.');
      return;
    }

    try {
      const image = [image1, image2, image3, image4]
        .filter(Boolean)
        .map((url) => ({ url, alt: name }));
      const token = localStorage.getItem('token'); 
      
      if(!token){
        alert('No tienes permisos para añadir productos.');
        navigate('/');
        return;
      }

      const data = {
        name,
        description,
        price,
        category,
        subCategory,
        bestSeller,
        sizes,
        image,
        colour,
        stock
      };

      const response = await axios.post('http://localhost:4000/products', data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 201) {
        toast.success('Producto añadido con éxito');
        setName('');
        setDescription('');
        setPrice('');
        setCategory('Remeras');
        setSubCategory('Unicas');
        setBestSeller(false);
        setSizes([]);
        setImage1('');
        setImage2('');
        setImage3('');
        setImage4('');
        setColour('');
        setStock('');
      }
    } catch (error) {
      console.error('Error al añadir el producto:', error);
      alert('Hubo un error al añadir el producto');
    }
  };

  if(!isAdmin) return null;

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-3">
      <div>
        <p className="mb-4">Links de las imágenes</p>
        <div className="flex flex-col gap-2">
          {[image1, image2, image3, image4].map((image, index) => (
            <div key={index} className="flex flex-col">
              <label htmlFor={`image${index + 1}`}>Imagen {index + 1}:</label>
              <input
                type="text"
                id={`image${index + 1}`}
                placeholder="Coloca el link de la imagen aquí"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={image}
                onChange={(e) => {
                  if (index === 0) setImage1(e.target.value);
                  else if (index === 1) setImage2(e.target.value);
                  else if (index === 2) setImage3(e.target.value);
                  else if (index === 3) setImage4(e.target.value);
                }}
                required={index === 0}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Nombre del Producto</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Escribelo aqui"
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Descripción del producto</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full max-w-[500px] px-3 py-2"
          placeholder="Escribelo aqui"
          required
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Categoría del producto</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="w-full px-3 py-2"
          >
            <option value="Remeras">Remeras</option>
            <option value="Pantalones">Pantalones</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Subcategoría del producto</p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            value={subCategory}
            className="w-full px-3 py-2"
          >
            <option value="Lisas">Lisas</option>
            <option value="Rayadas">Rayadas</option>
            <option value="Unicas">Únicas</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Precio</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="w-full px-3 py-2 sm:w-[120px]"
            type="number"
            placeholder="$"
            required
          />
        </div>
      </div>

      <div>
        <p className="mb-2">Talles</p>
        <div className="flex gap-3">
          {['S', 'M', 'L', 'XL'].map((size) => (
            <div
              key={size}
              onClick={() =>
                setSizes((prev) =>
                  prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
                )
              }
            >
              <p
                className={`${
                  sizes.includes(size) ? 'bg-pink-100' : 'bg-slate-200'
                } px-3 py-1 cursor-pointer`}
              >
                {size}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Color</p>
        <input
          onChange={(e) => setColour(e.target.value)}
          value={colour}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Ejemplo: Rojo, Azul, Verde"
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Cantidad en stock</p>
        <input
          onChange={(e) => setStock(e.target.value)}
          value={stock}
          className="w-full max-w-[500px] px-3 py-2"
          type="number"
          placeholder="Ejemplo: 50"
          required
        />
      </div>

      <div className="flex gap-2 mt-2">
        <input
          onChange={() => setBestSeller((prev) => !prev)}
          checked={bestSeller}
          type="checkbox"
          id="bestseller"
        />
        <label className="cursor-pointer" htmlFor="bestseller">
          Añadir como Tendencia
        </label>
      </div>

      <button type="submit" className="w-28 py-3 mt-4 bg-black text-white">
        AÑADIR
      </button>
    </form>
  );
};

export default Add;
