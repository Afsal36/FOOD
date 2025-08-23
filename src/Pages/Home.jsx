import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import './home.css';

function Home() {
    const [state, setState] = useState([]); 
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    
    async function meals() {
        setLoading(true);
        const apivalue = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
        console.log(apivalue.data.categories);
        setState(apivalue.data.categories);
        setLoading(false);
    }

    async function searchMeals(searchQuery) {
        if (!searchQuery.trim()) {
            setIsSearching(false);
            return;
        }
        
        setIsSearching(true);
        setLoading(true);
        try {
            const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`);
            setSearchResults(response.data.meals || []);
        } catch (error) {
            console.error("Error searching meals:", error);
            setSearchResults([]);
        } finally {
            setLoading(false);
        }
    }

    const handleSearch = (e) => {
        e.preventDefault();
        searchMeals(searchTerm);
    }

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        if (e.target.value === '') {
            setIsSearching(false);
            setSearchResults([]);
        }
    }
        
    useEffect(() => {
        meals();
    }, []);

    return (
        <>
            {/* Header */}
            <header className="header">
                <div className="container">
                    <div className="header-content">
                        <div className="logo">
                            <i className="fas fa-utensils"></i>
                            Delicious Recipes
                        </div>
                        <div className="search-bar">
                            <form onSubmit={handleSearch}>
                                <input 
                                    type="text" 
                                    placeholder="Search for recipes..." 
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />
                                <button type="submit"><i className="fas fa-search"></i></button>
                            </form>
                        </div>
                    </div>
                </div>
            </header>
            
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <h1>Discover Amazing Recipes</h1>
                    <p>Explore thousands of delicious recipes from around the world</p>
                    <a href="#" className="cta-button">Get Cooking <i className="fas fa-arrow-right"></i></a>
                </div>
            </section>

            {/* Search Results Section */}
            {isSearching && (
                <section className="search-results-section">
                    <div className="container">
                        <h2 className="section-title">
                            Search Results for "{searchTerm}"
                            {searchResults.length > 0 && ` (${searchResults.length} found)`}
                        </h2>
                        
                        {loading ? (
                            <div className="loader-container">
                                <div className="loader">
                                    <div className="loader__bar"></div>
                                    <div className="loader__bar"></div>
                                    <div className="loader__bar"></div>
                                    <div className="loader__bar"></div>
                                    <div className="loader__bar"></div>
                                    <div className="loader__ball"></div>
                                </div>
                            </div>
                        ) : searchResults.length > 0 ? (
                            <div className="meals-grid">
                                {searchResults.map((meal) => (
                                    <Link to={`/Detail/${meal.idMeal}`} key={meal.idMeal} className="meal-card">
                                        <img src={meal.strMealThumb} alt={meal.strMeal} />
                                        <div className="meal-content">
                                            <h3>{meal.strMeal}</h3>
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
                                <p>Sorry, we couldn't find any recipes matching "{searchTerm}".</p>
                                <button 
                                    className="cta-button" 
                                    onClick={() => setIsSearching(false)}
                                >
                                    Back to Categories
                                </button>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* Categories Section - Only show when not searching */}
            {!isSearching && (
                <section className="categories-section">
                    <div className="container">
                        <h2 className="section-title">Meal Categories</h2>
                        <div className="categories-list">
                            {loading ? (
                                <div className="loader-container">
                                    <div className="loader">
                                        <div className="loader__bar"></div>
                                        <div className="loader__bar"></div>
                                        <div className="loader__bar"></div>
                                        <div className="loader__bar"></div>
                                        <div className="loader__bar"></div>
                                        <div className="loader__ball"></div>
                                    </div>
                                </div>
                            ) : (
                                state.map((li) => (
                                    <Link to={`/Single/${li.strCategory}`} key={li.idCategory} className="category-item">
                                        <img src={li.strCategoryThumb} alt={li.strCategory} />
                                        <div className="category-content">
                                            <h3>{li.strCategory}</h3>
                                            <p>Explore delicious {li.strCategory.toLowerCase()} recipes from around the world.</p>
                                            <span className="read-more">Explore Recipes <i className="fas fa-arrow-right"></i></span>
                                        </div>
                                    </Link>
                                ))
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-section">
                            <h3>About Us</h3>
                            <p>Delicious Recipes is your ultimate cooking guide with thousands of tested recipes, how-to videos, and meal ideas.</p>
                        </div>
                        
                        <div className="footer-section">
                            <h3>Quick Links</h3>
                            <ul>
                                <li><a href="#">Home</a></li>
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
                </div>
            </footer>
        </>
    );
}

export default Home;