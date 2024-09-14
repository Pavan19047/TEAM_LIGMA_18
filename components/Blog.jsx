import React, { useEffect, useState } from 'react';
import axios from 'axios';  
import '../CSS/blogpage.css';

const BlogCatalog = () => {
    const [blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 5;  // Adjust this to change the number of blogs per page

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const response = await axios.get('http://localhost:2000/blogs');
            setBlogs(response.data); 
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    };

    // Get the blogs for the current page
    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Create page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(blogs.length / blogsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className='BlogPage'>
            <header>
                <nav className='navhome'>
                    <a href="/">Home</a>
                    <div className="dropdown">
                        <a href="/products-catalog">Products</a>
                        {/* <div className="dropdown-content">
                            <a href="#">Vegetables</a>
                            <a href="#">Fruits</a>
                            <a href="#">Seeds</a>
                        </div> */}
                    </div>
                    <a href="http://localhost:5173/">Farmers-DhashBoard</a>
                    <a href="/blog">Blog</a>
                    <a href="/register">Register</a>
                    <a href="/login">Login</a>
                </nav>
            </header>
        <div className="blog-catalog">
            {currentBlogs.map((blog) => (
                <div className="blog-item" key={blog.id}>
                    <div className="blog-info">
                        <h2 className="blog-title">{blog.title}</h2>
                        <p className="blog-description">{blog.description}</p>
                        <p className="blog-category">{blog.category}</p>
                    </div>
                </div>
            ))}

            <div className="pagination">
                {pageNumbers.map(number => (
                    <span
                        key={number}
                        onClick={() => paginate(number)}
                        className={number === currentPage ? 'page-number active' : 'page-number'}
                    >
                        {number}
                    </span>
                ))}
            </div>
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

export default BlogCatalog;