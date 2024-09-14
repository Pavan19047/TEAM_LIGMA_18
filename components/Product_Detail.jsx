import React, { useState } from 'react';
import axios from 'axios';
import '../CSS/ProductDetail.css'; // Make sure to create this CSS file
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
const ProductDetail = () => {
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productPrice, setProductPrice] = useState(0);
    const [stockQuantity, setStockQuantity] = useState(0);
    const [Category, setCategory] = useState("");
    const [VentorDetails, setVentorDetails] = useState("");
    const [productUrl, setProductUrl] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [vendor, setVendor] = useState("");
    const [inStock, setInStock] = useState(true);  // For In Stock feature
    const [offer, setOffer] = useState("10% Off"); // For Offers feature
    const originalPrice = 29.99; // Original price per kg
    const { id } = useParams();
    useEffect(() => {
        // Fetch product details from the backend
        axios.get(`http://localhost:4000/products_find/${id}`)
            .then(response => {
                const product = response.data;
                console.log(product)
                setProductName(product.name);
                setProductDescription(product.description);
                setProductPrice(product.price);
                // console.log(product.price)
                setCategory(product.category);
                setStockQuantity(product.quantity);
                setVentorDetails(product.vendor_details);
                setProductUrl(product.image_url);
                
                // console.log(product.name)
                // console.log(product.description)
                // setProductPrice(product.price);
                // setStockQuantity(product.stockQuantity);
                // setProductImage(product.image);
                // setInStock(product.inStock);
                // setOffer(product.offer);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);



    // Calculate discount from the offer
    const calculateDiscountedPrice = (price, offer) => {
        const discount = parseFloat(offer.replace('% Off', '')) / 100;
        return (price - price * discount).toFixed(2);
    };

    const discountedPrice = calculateDiscountedPrice(originalPrice, offer);

    const changeQuantity = (amount) => {
        setQuantity(prevQuantity => Math.max(prevQuantity + amount, 1));
    };

    const addToCart = () => {
        if (inStock) {
            alert(`Added ${quantity} item(s) to cart`);
        } else {
            alert("This item is currently out of stock.");
        }
    };

    return (
        <div className="Product">
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
        <div className="product-detail">
            <div className="product-image">
                <img src={productUrl} alt="Product" />
            </div>
            <div className="product-info">
                <h1 className="product-name">{productName}</h1>

                {/* In Stock Indicator */}
                <p className="product-stock">{inStock ? "In Stock" : "Out of Stock"}</p>

                {/* Offer Indicator */}
                <p className="product-offer">{offer ? `Offer: ${offer}` : "No offers available"}</p>

                <div className="quantity-controls">
                    <button onClick={() => changeQuantity(-1)}>-</button>
                    <span id="quantity-display">{quantity}</span>
                    <button onClick={() => changeQuantity(1)}>+</button>
                </div>
                <div>
                    <button className="add-to-cart-btn" onClick={addToCart}>Add to Cart</button>
                </div>

                {/* Display Original and Discounted Price */}
                <p className="product-price">
                    Original Price: <span className="original-price">{productPrice}/Kg</span> <br/>
                    Discounted Price: <span className="discounted-price">Rs{discountedPrice}/Kg</span>
                </p>

                <p className="product-description"><strong>Description: </strong>
                <span>
                    {productDescription}
                </span></p>
                <p className="product-vendor">Vendor Details: <span>{VentorDetails}</span></p>
                <p className="product-category">Category: <span>{Category}</span></p>
                <p className="product-rating">Rating: <span>4.5/5</span></p>
            </div>
        </div>
        <div className="recommend">
        <section className="section">
            <h2>Vegetables on Sale</h2>
            <div className="product">
                <div className="product-item">
                    <img src="https://via.placeholder.com/300" alt="Tomatoes"/>
                    <h3>Tomatoes</h3>
                    <p>$2.50/kg</p>
                </div>
                <div className="product-item">
                    <img src="https://images.pexels.com/photos/2280550/pexels-photo-2280550.jpeg" alt="Carrots"/>
                    <h3>Carrots</h3>
                    <p>$1.20/kg</p>
                </div>
                <div className="product-item">
                    <img src="https://via.placeholder.com/300" alt="Potatoes"/>
                    <h3>Potatoes</h3>
                    <p>$1.00/kg</p>
                </div>
            </div>
        </section>

        <section className="section">
            <h2>Fruits on Sale</h2>
            <div className="product">
                <div className="product-item">
                    <img src="https://via.placeholder.com/100" alt="Apples"/>
                    <h3>Apples</h3>
                    <p>$3.00/kg</p>
                </div>
                <div className="product-item">
                    <img src="https://via.placeholder.com/100" alt="Bananas"/>
                    <h3>Bananas</h3>
                    <p>$1.50/kg</p>
                </div>
                <div className="product-item">
                    <img src="https://via.placeholder.com/100" alt="Oranges"/>
                    <h3>Oranges</h3>
                    <p>$2.00/kg</p>
                </div>
            </div>
        </section>
    </div>
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
};

export default ProductDetail;
