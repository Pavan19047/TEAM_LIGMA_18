import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductDetail from './components/Product_Creating';
import ProductCreating from './components/Product_Detail';
import ProductCatalog from './components/Product_Catalogue';
import Cart from './components/Cart';
import RegisterPage from './components/Register';
import Login from './components/Login';
import BlogCatalog from './components/Blog';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path="/CreateProduct" element={<ProductDetail />} />
          <Route path="/get-product/:id" element={<ProductCreating />} />
          <Route path="/product-catalog" element={<ProductCatalog />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path='/Blog' element={<BlogCatalog/>}/>
          <Route path="*" element={<h1>Page not found</h1>} />  
        </Routes>
      </Router>
    </div>
  );
}

export default App;
