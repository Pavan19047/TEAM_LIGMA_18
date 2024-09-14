import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import '../CSS/Product_Catalogue.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductCatalog = () => {
  const [productList, setProductList] = useState([]); // State for productList
  const products = [
    {
      name: 'Apple',
      category: 'Fruit',
      image: 'https://images.pexels.com/photos/28390843/pexels-photo-28390843.png', // Replace with actual image URLs
      offer: '10% off'
    },
    {
      name: 'Banana',
      category: 'Fruit',
      image: 'https://images.pexels.com/photos/28390843/pexels-photo-28390843.png',
      offer: 'Buy 1 Get 1 Free'
    },
    {
      name: 'Carrot',
      category: 'Vegetable',
      image: 'https://images.pexels.com/photos/28390843/pexels-photo-28390843.png',
      offer: '15% off'
    },
    {
      name: 'Milk',
      category: 'Dairy',
      image: 'https://images.pexels.com/photos/28390843/pexels-photo-28390843.png',
      offer: '5% off'
    },
    // Add more products as needed
  ];
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const handleClick = (product) => {
    console.log(product.UniqueID);
    // window.location.href = 'http://localhost:3000/create-product/'+product.UniqueID;
  };
  // Fetch product list from backend
  useEffect(() => {
    axios.get('http://localhost:4000/catalogue')
      .then(response => {
        const products = response.data;
        setProductList(products);  // Set productList to the fetched data
        console.log(products);  // Log products from the response
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);  // Empty dependency array means this runs only once on mount

  const categories = [
    {
      name: 'Vegetables',
      image: 'https://images.pexels.com/photos/2255924/pexels-photo-2255924.jpeg' // Replace with actual category image URL
    },
    {
      name: 'Fruits',
      image: 'https://images.pexels.com/photos/3025236/pexels-photo-3025236.jpeg' // Replace with actual category image URL
    },
    {
      name: 'Poultry/Dairy',
      image: 'https://images.pexels.com/photos/600615/pexels-photo-600615.jpeg' // Replace with actual category image URL
    }
  ];

  const slideshow = [
    {
      name: 'Vegetables',
      image: 'https://klinegroup.com/wp-content/uploads/Fruit-vegetable-blog-banner.jpg' // Replace with actual category image URL
    },
    {
      name: 'Fruits',
      image: 'https://images.pexels.com/photos/3025236/pexels-photo-3025236.jpeg' // Replace with actual category image URL
    },
    {
      name: 'Poultry/Dairy',
      image: 'https://images.pexels.com/photos/600615/pexels-photo-600615.jpeg' // Replace with actual category image URL
    }
  ];




  return (
    <div className='ProductCatalogmain'>
      <header>
        <nav className='navhome'>
          <a href="/">Home</a>
          <div className="dropdown">
            <a href="/product-catalog">Products</a>
            {/* <div className="dropdown-content">
              <a href="#">Vegetables</a>
              <a href="#">Fruits</a>
              <a href="#">Seeds</a>
            </div> */}
          </div>
          <a href="#">Offers</a>
          <a href="/cart">Mycart</a>
          <a href="/register">Register</a>
          <a href="/login">Login</a>
        </nav>
      </header>

      {/* Slideshow */}
      <Slider {...sliderSettings} className="product-slideshow">
        {slideshow.map((prod, index) => (
          <div key={index} className="slide">
            <img src={prod.image} alt={prod.name} />
          </div>
        ))}
      </Slider>

      {/* Product catalog */}
      <div className="product-catalog" >
        {productList.map((product, index) => (
          
          <div key={index} className="product-card">
            <Link to={`/get-product/${product.uniqueID}`}>
            <img className="img-pr" src={product.Image_Url}  alt={product.name} />
            <h3 className='text-pr'>{product.name}</h3>
            <p className='text-pr'>{product.Offer}</p>
            </Link>
          </div>
          
        
        ))}
      </div>

      {/* Category Images */}
      <h1>Categories</h1>
      <div className="category-images">
        {categories.map((category, index) => (
          <div key={index} className="category-card">
            <img src={category.image} alt={category.name} />
            <h3>{category.name}</h3>
          </div>
        ))}
      </div>

      <footer className="footer-cat">
        <p>&copy; 2024 KISANET. All rights reserved.</p>
        <p>
          <a href="#">Privacy Policy</a> | 
          <a href="#">Terms of Service</a> | 
          <a href="#">Contact Us</a>
        </p>
      </footer>
    </div>
  );
};

export default ProductCatalog;
