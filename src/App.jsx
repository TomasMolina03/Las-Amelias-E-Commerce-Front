import {Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
import Collection from './pages/Collection';
import About from './pages/About';
import Contact from './pages/Contact';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import PlaceOrder from './pages/PlaceOrder';
import Orders from './pages/Orders';
import Footer from "./components/Footer";
import SearchBox from "./components/SearchBox";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PanelAdm from "./pages/PanelAdm";
import Add from "./pages/Add";
import List from "./pages/List";
import OrdersAdm from "./pages/OrdersAdm";
import Navbar from "./components/Navbar";
import Profile from './pages/Profile';



const App = () => {

  return(
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <Navbar/>
      <ToastContainer  />
      <SearchBox />
      <Routes>
        <Route path='/' element={<Home/>}  />
        <Route path='/collection' element={<Collection/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/product/:productId' element={<Product/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/place-order' element={<PlaceOrder/>} />
        <Route path='/orders/:id' element={<Orders/>} />
        <Route path='//panelAdm/*' element={<PanelAdm/>} />
        <Route path='/add' element={<Add/>} />
        <Route path='/list' element={<List/>} />
        <Route path='/ordersAdm' element={<OrdersAdm/>} />
        <Route path='/profile/:id' element={<Profile/>} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App