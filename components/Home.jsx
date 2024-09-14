import React from 'react';
import '../CSS/HomePage.css';

function Home() {
  return (
    <div className='Home'>
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
                <a href="#">Contact</a>
                <a href="/register">Register</a>
                <a href="/login">Login</a>
            </nav>
        </header>

        <div className="hero">
            <video autoPlay muted loop>
                <source src="https://videos.pexels.com/video-files/3616640/3616640-hd_1920_1080_24fps.mp4" type="video/mp4"/>
                Your browser does not support the video tag.
            </video>
            <div className="text-overlay">
                <h1 className='headingtext'>KISANET</h1>
                <p> think empowering farmers, enriching lifes is an good one</p>
            </div>
        </div>

        <div className="description">
            <h2>KISANET</h2>
            
            <p>
                At <strong>KISANET</strong>, our mission is to empower farmers by integrating the latest technology into everyday farming practices, making agriculture more efficient, sustainable, and profitable. We understand the challenges you face, and we're here to provide solutions that make a real difference.
            </p>
            
            <div className="text-image-container">
                <img src="https://images.pexels.com/photos/20527345/pexels-photo-20527345/free-photo-of-farmers-in-india.jpeg" alt="Crop Recommendation" className="left-image"/>
                <div className="text-content">
                    <h3>Crop Recommendation</h3>
                    <br/>
                    <p>
                        Choosing the right crop for your farm can greatly impact how well your plants grow and how much produce you get. Our system is designed to help you make the best decision by providing personalized crop recommendations. Here’s how it works:
                        First, we look at the nutrients in your soil, which are Nitrogen, Phosphorus, and Potassium (NPK). These nutrients are essential for plant growth, and each crop has specific needs for these nutrients. By analyzing the NPK levels in your soil, we can understand what your soil might be lacking or what it has in abundance.
                        Next, we consider the current weather conditions. Weather plays a crucial role in plant growth. Factors like temperature, rainfall, and humidity can affect how well a crop grows. Our system takes these weather conditions into account to recommend crops that will thrive under the existing climate.
                        By combining the information from your soil and the weather, our system suggests crops that are best suited for your specific conditions. This means you’ll be more likely to choose crops that will grow well, yield a good harvest, and make the most out of your resources.
                        In simple terms, our system helps you match your soil and weather conditions with the right crops. This way, you can optimize your farming efforts, improve the health of your plants, and achieve better results from your fields.
                    </p>
                </div>
            </div>
            
            <div className="text-image-container">
                <div className="text-content">
                    <h3>Water Management</h3>
                    <br/>
                    <p>
                        Water is essential for keeping crops healthy and ensuring they grow well, but managing it can be tricky. Too much water or too little can harm your plants and waste resources. Our system helps you keep the right balance by monitoring water levels in real-time.
                        Here’s how it works: we constantly check the amount of water available in your fields. This real-time data allows us to see whether your crops are getting the right amount of water they need. With this information, our system can alert you if you’re giving too much or too little water.
                        By keeping track of water levels, our system helps you avoid common problems like over-watering, which can lead to root rot and other issues, or under-watering, which can cause plants to wilt and grow poorly. Proper water management not only supports healthy plant growth but also helps conserve water resources, which is important for both the environment and your farming costs.
                    </p>
                </div>
                <img src="https://images.pexels.com/photos/13437374/pexels-photo-13437374.jpeg" alt="Water Management" className="right-image"/>
            </div>
            
            <div className="text-image-container">
                <img src="https://images.pexels.com/photos/20313652/pexels-photo-20313652/free-photo-of-a-farmer-is-spraying-cabbage-plants-in-a-field.jpeg" alt="Pest Detection" className="left-image"/>
                <div className="text-content">
                    <h3>Pest Detection</h3>
                    <br/>
                    <p>
                        Pests can seriously damage your crops if they're not dealt with quickly. Our advanced pest detection technology is here to help you catch and manage pest problems early on. Here’s how it works:
                        On our website, you can upload pictures of any pests you find on your crops. Our system analyzes these images to identify the type of pest. Once we know what pest you’re dealing with, we provide detailed information about it, including its name and the best ways to control or eliminate it.
                        This early detection and identification process is crucial because it allows you to take action before pests can cause significant harm to your crops. By addressing pest issues promptly, you can apply the right treatments and prevent further damage. This means your crops have a better chance to stay healthy and produce a good yield.
                        In essence, our service helps you protect your crops by making pest detection and management easier. You get the information you need to tackle pest problems efficiently, ensuring your crops remain in top condition and your harvests are as productive as possible.
                    </p>
                </div>
            </div>
            
            <div className="text-image-container">
                <div className="text-content">
                    <h3>Sell Your Fresh Produce Directly to Consumers</h3>
                    <br/>
                    <p>
                        In addition to providing advanced agricultural solutions, we also run a comprehensive e-commerce platform designed to connect farmers with consumers. Our platform is dedicated to making it easier for you to sell your high-quality produce directly through our website.
                        We focus on offering a wide range of products including vegetables, fruits, dairy, and poultry. By using our e-commerce platform, you can showcase your produce to a broader audience and ensure that your products reach the market efficiently. Our system is designed to streamline the process, from listing your products to managing sales and deliveries.
                        One of the key benefits of our platform is that we strive to offer the best prices for the produce we sell. We understand the importance of fair pricing for both farmers and consumers. By providing competitive prices, we help ensure that farmers receive a fair return for their hard work while offering consumers access to fresh, high-quality products at reasonable rates.
                        Our platform is user-friendly and designed to support you throughout the selling process. From uploading product details to handling transactions, we provide the tools you need to manage your online sales effortlessly. This way, you can focus on what you do best—producing high-quality goods—while we take care of connecting you with buyers.
                        In summary, our e-commerce platform not only supports your agricultural needs but also provides a robust marketplace for selling your produce. By facilitating efficient sales and offering competitive prices, we help you reach more customers and achieve better results from your efforts.
                    </p>
                </div>
                <img src="https://images.pexels.com/photos/3770775/pexels-photo-3770775.jpeg" alt="E-Commerce Platform" className="right-image"/>
            </div>
        </div>

        <div className="footer">
            <p>&copy; 2024 KISANET. All rights reserved.</p>
            <p>
                <a href="#">Privacy Policy</a> | 
                <a href="#">Terms of Service</a> | 
                <a href="#">Contact Us</a>
            </p>
        </div>
    </div>
  );
}

export default Home;