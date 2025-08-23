import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import axios from 'axios'
import './Single.css';

function Single() {
    const [state, setState] = useState([]);
    const [loading, setLoading] = useState(true);
    const { Dishes } = useParams();
    
    async function display() {
        setLoading(true);
        try {
            const value = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${Dishes}`);
            console.log(value);
            setState(value.data.meals || []);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    }
    
    useEffect(() => {
        display();
    }, [Dishes]);
   
    return (
        <div className="single-page">
            {/* Header */}
            <header className="single-header">
                <div className="header-content">
                    <Link to="/" className="logo">
                        <i className="fas fa-utensils"></i>
                        Delicious Recipes
                    </Link>
                    <Link to="/" className="back-button">
                        <i className="fas fa-arrow-left"></i> Back to Categories
                    </Link>
                </div>
            </header>
            {/* Page Title */}
            <div className="page-title">
                <h1>{Dishes} Recipes</h1>
                <p>Discover our delicious selection of {Dishes.toLowerCase()} dishes from around the world</p>
            </div>
            {/* Meals Grid */}
            <section className="meals-section">
                {loading ? (
                    <div className="loader-container">
                        <div className="meal-loader"></div>
                    </div>
                ) : state.length > 0 ? (
                    <div className="meals-grid">
                        {state.map((li) => (
                            <Link to={`/Detail/${li.idMeal}`} key={li.idMeal} className="meal-card">
                                <img src={li.strMealThumb} alt={li.strMeal} className="meal-image" />
                                <div className="meal-content">
                                    <h3>{li.strMeal}</h3>
                                    <div className="meal-id">ID: {li.idMeal}</div>
                                    <span className="view-recipe">
                                        View Recipe <i className="fas fa-arrow-right"></i>
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="no-results">
                        <i className="fas fa-utensil-spoon"></i>
                        <h3>No Recipes Found</h3>
                        <p>Sorry, we couldn't find any recipes for {Dishes}.</p>
                    </div>
                )}
            </section>

            {/* Footer */}
            <footer className="single-footer">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>About Us</h3>
                        <p>Delicious Recipes is your ultimate cooking guide with thousands of tested recipes, how-to videos, and meal ideas.</p>
                    </div>
                    
                    <div className="footer-section">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><a href="#">Categories</a></li>
                            <li><a href="#">Popular Recipes</a></li>
                            <li><a href="#">Cooking Tips</a></li>
                            <li><a href="#">Contact Us</a></li>
                        </ul>
                    </div>
                    
                    <div className="footer-section">
                        <h3>Connect With Us</h3>
                        <p>Follow us on social media for daily recipe inspiration</p>
                        <div className="social-links">
                            <a href="#"><i className="fab fa-facebook-f"></i></a>
                            <a href="#"><i className="fab fa-instagram"></i></a>
                            <a href="#"><i className="fab fa-pinterest"></i></a>
                            <a href="#"><i className="fab fa-youtube"></i></a>
                            <a href="#"><i className="fab fa-twitter"></i></a>
                        </div>
                    </div>
                </div>
                
                <div className="footer-bottom">
                    <p>&copy; 2023 Delicious Recipes. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}

export default Single;
