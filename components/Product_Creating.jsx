import React, { useState } from 'react';
import axios from 'axios';
import "../CSS/ProductCreating.css";

function Product_Creating() {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [stockQuantity, setStockQuantity] = useState(0);
  const [productImage, setProductImage] = useState(null);
  const [offer, setOffer] = useState();
  const [category, setCategory] = useState();
  // Function to convert image to base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh on submit

    try {
      let base64Image = null;
      if (productImage) {
        base64Image = await convertToBase64(productImage); // Convert the image to base64
      }

      // Prepare JSON data
      const productData = {
        productName,
        productDescription,
        productPrice,
        stockQuantity,
        offer,
        category,
        productImage: base64Image // Image as base64 string
      };

      // Send a POST request with JSON data to the backend
      const response = await axios.post('http://localhost:4000/api/products', productData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        alert("Product created successfully!");
        // Clear the form after successful submission
        setProductName("");
        setProductDescription("");
        setProductPrice(0);
        setStockQuantity(0);
        setProductImage(null);
      } else {
        alert("Error creating product");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to create product.");
    }
  };

  return (
    <div className="Product_Create">
      <header>
        <nav className='navhome'>
          <a href="/">Home</a>
          <div className="dropdown">
            <a href="#">Products</a>
            {/* <div className="dropdown-content">
              <a href="#">Vegetables</a>
              <a href="#">Fruits</a>
              <a href="#">Seeds</a>
            </div> */}
          </div>
          <a href="#">Offers</a>
          <a href="#">Contact</a>
          <a href="/register">Register</a>
          <a href="/login">Login</a>
        </nav>
      </header>

      <form className="Form_Class" onSubmit={handleSubmit}>
        <h2>Create Your Product</h2>

        <div className="form-group">
          <label htmlFor="product-image">Product Image:</label>
          <input
            type="file"
            id="product-image"
            accept="image/*"
            onChange={(e) => setProductImage(e.target.files[0])}
          />
        </div>

        <div className="form-group">
          <label htmlFor="product-name">Product Name:</label>
          <input
            type="text"
            id="product-name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Enter product name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="product-description">Product Description:</label>
          <textarea
            id="product-description"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            placeholder="Enter product description"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="product-price">Price (in USD):</label>
          <input
            type="number"
            id="product-price"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            min="0"
            step="0.01"
            placeholder="Enter price"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="stock-quantity">Stock Quantity:</label>
          <input
            type="number"
            id="stock-quantity"
            value={stockQuantity}
            onChange={(e) => setStockQuantity(e.target.value)}
            min="0"
            placeholder="Enter stock quantity"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="stock-quantity">OFFER:</label>
          <input
            type="number"
            id="stock-quantity"
            value={offer}
            onChange={(e) => setOffer(e.target.value)}
            min="0"
            placeholder="Enter stock quantity"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="product-name">Catergory:</label>
          <input
            type="text"
            id="product-name"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Enter product name"
            required
          />
        </div>

        <button type="submit" className="submit-btn">Create Product</button>
      </form>

      <footer className="footer">
        <p>&copy; 2024 KISANET. All rights reserved.</p>
        <p>
          <a href="#">Privacy Policy</a> | 
          <a href="#">Terms of Service</a> | 
          <a href="#">Contact Us</a>
        </p>
      </footer>
    </div>
  );
}

export default Product_Creating;
