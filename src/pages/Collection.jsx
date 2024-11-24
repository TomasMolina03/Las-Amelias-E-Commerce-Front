import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/user/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products, setSearch } = useContext(ShopContext); // Añadido setSearch para actualizar el estado global
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevancia');
  const [localSearch, setLocalSearch] = useState(''); // Estado local para el input de búsqueda

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    // Filtro por búsqueda
    if (localSearch) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(localSearch.toLowerCase())
      );
    }

    // Filtro por categorías
    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) => category.includes(item.category));
    }

    // Filtro por subcategorías
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) => subCategory.includes(item.subCategory));
    }

    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();
    switch (sortType) {
      case 'bajo-alto':
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;

      case 'alto-bajo':
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;

      default:
        applyFilter();
        break;
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setLocalSearch(value);
    setSearch(value); // Actualizar el estado global
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, localSearch]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filtros */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTROS
          <img
            className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>

        {/* Categorías */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className="mb-3 text-sm font-medium">CATEGORÍAS</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value="Remeras" onChange={toggleCategory} /> Remeras
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value="Pantalones" onChange={toggleCategory} /> Pantalones
            </p>
          </div>
        </div>

        {/* Subcategorías */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className="mb-3 text-sm font-medium">TIPOS</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value="Rayas" onChange={toggleSubCategory} /> Rayas
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value="Lisas" onChange={toggleSubCategory} /> Lisas
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value="Unicas" onChange={toggleSubCategory} /> Únicas
            </p>
          </div>
        </div>
      </div>

      {/* Productos */}
      <div className="flex-1">
  {/* Título en la parte superior */}
  <div className="text-center mb-6">
    <Title text1="TODAS NUESTRAS" text2="PRENDAS" />
  </div>

  {/* Inputs de búsqueda y ordenamiento */}
  <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
    <input
      type="text"
      placeholder="Buscar productos..."
      className="border-2 border-gray-300 text-sm px-4 py-2 w-full sm:w-10px"
      value={localSearch}
      onChange={handleSearchChange}
    />
    <select
      onChange={(e) => setSortType(e.target.value)}
      className="border-2 border-gray-300 text-sm px-4 py-2 w-full sm:w-auto"
    >
      <option value="relevancia">Filtrar por: Relevancia</option>
      <option value="bajo-alto">Filtrar por: Menor Precio a Mayor</option>
      <option value="alto-bajo">Filtrar por: Mayor Precio a Menor</option>
    </select>
  </div>

  {/* Productos filtrados */}
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
    {filterProducts.map((item, index) => (
      <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
    ))}
  </div>
</div>

    </div>
  );
};

export default Collection;
