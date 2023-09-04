import './App.css';
import { Products } from './pages/products';
import { Auth } from './pages/auth';
import { Checkout } from './pages/checkout';
import { Navbar } from './components/navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AddProducts } from './pages/addProducts';



function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
        
          <Route path="/" element={<Products />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/add-products" element={<AddProducts/>}/>
        </Routes>
      </Router>


      

    </div>
  );
}

export default App;
