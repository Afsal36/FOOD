import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router';
import axios from 'axios';
import './Detail.css';

function Detail() {
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  async function fetchMealDetails() {
    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      if (response.data.meals) {
        setMeal(response.data.meals[0]);
      }
    } catch (error) {
      console.error("Error fetching meal details:", error);
    } finally {
      setLoading(false);
    }
  }

  const addToCart = () => {
    // Get existing cart from localStorage or initialize empty array
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if meal is already in cart
    const isAlreadyInCart = existingCart.some(item => item.id === meal.idMeal);
    
    if (!isAlreadyInCart) {
      // Add meal to cart
      const mealToAdd = {
        id: meal.idMeal,
        name: meal.strMeal,
        image: meal.strMealThumb,
        price: 9.99, // Default price since API doesn't provide one
        quantity: 1
      };
      
      const updatedCart = [...existingCart, mealToAdd];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setAddedToCart(true);
      
      // Reset addedToCart after 2 seconds
      setTimeout(() => setAddedToCart(false), 2000);
    } else {
      alert('This meal is already in your cart!');
    }
  };

  const goToCart = () => {
    navigate('/cart');
  };

  useEffect(() => {
    fetchMealDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="detail-container">
        <div className="loading">Loading meal details...</div>
      </div>
    );
  }

  if (!meal) {
    return (
      <div className="detail-container">
        <div className="error">Meal not found!</div>
        <Link to="/" className="back-link">Go back to home</Link>
      </div>
    );
  }

  // Extract ingredients and measurements
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push({
        ingredient: meal[`strIngredient${i}`],
        measure: meal[`strMeasure${i}`]
      });
    }
  }

  return (
    <div className="detail-container">
      <Link to="/" className="back-link">← Back to Recipes</Link>
      
      <div className="meal-header">
        <h1 className="meal-title">{meal.strMeal}</h1>
        <div className="meal-meta">
          <span className="meal-category">{meal.strCategory}</span>
          <span className="meal-area">{meal.strArea}</span>
          {meal.strTags && (
            <span className="meal-tags">{meal.strTags.split(',').join(', ')}</span>
          )}
        </div>
      </div>

      <div className="meal-content">
        <div className="meal-image-container">
          <img 
            src={meal.strMealThumb} 
            alt={meal.strMeal} 
            className="meal-image"
          />
          
          <div className="action-buttons">
            <button 
              className={`add-to-cart-btn ${addedToCart ? 'added' : ''}`}
              onClick={addToCart}
            >
              {addedToCart ? '✓ Added to Cart' : 'Add to Cart'}
            </button>
            
            <button 
              className="view-cart-btn"
              onClick={goToCart}
            >
              View Cart
            </button>
          </div>
          
          {meal.strSource && (
            <a 
              href={meal.strSource} 
              target="_blank" 
              rel="noopener noreferrer"
              className="source-link"
            >
              Original Source
            </a>
          )}
          {meal.strYoutube && (
            <a 
              href={meal.strYoutube} 
              target="_blank" 
              rel="noopener noreferrer"
              className="youtube-link"
            >
              Watch on YouTube
            </a>
          )}
        </div>

        <div className="meal-details">
          <div className="ingredients-section">
            <h2>Ingredients</h2>
            <ul className="ingredients-list">
              {ingredients.map((item, index) => (
                <li key={index} className="ingredient-item">
                  <span className="ingredient-measure">{item.measure}</span>
                  <span className="ingredient-name">{item.ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="instructions-section">
            <h2>Instructions</h2>
            <div className="instructions-text">
              {meal.strInstructions.split('\n').map((paragraph, index) => (
                paragraph.trim() && <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
