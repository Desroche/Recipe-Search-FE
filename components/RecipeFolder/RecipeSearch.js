import React, { useEffect, useState } from 'react';
import RecipeCard from './RecipeCard/RecipeCard';
import './RecipeSearch.css';

const RecipeSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [recipeData, setRecipeData] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = () => {
    const trimmedSearchTerm = searchTerm.trim();

    if (/\./.test(trimmedSearchTerm)) {
      setError('Invalid input. Please enter a whole number of 1, 2, or 3.');
      return;
    }

    const searchTermAsNumber = Number(trimmedSearchTerm);
    const finalSearchTerm = Number(trimmedSearchTerm);


    if (isNaN(searchTermAsNumber) || searchTermAsNumber <= 0 || searchTermAsNumber > 3) {
      setError('Invalid input. Please enter a number of 1, 2, or 3.');
      return;
    }
   
    setError('');

    if (searchTermAsNumber === 1 || searchTermAsNumber === 2 || searchTermAsNumber === 3) {
      fetch(`/api/recipes?query=${finalSearchTerm}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => setRecipeData(data))
        .catch(error => {
          console.error('Error fetching data:', error);
          setError('Error fetching data. Please try again.');
        });
    } else {
      setError('Invalid input. Please enter a number of 1, 2, or 3.');
    }
  };

  useEffect(() => {
    if (error && (!searchTerm.trim() || isNaN(Number(searchTerm)) || Number(searchTerm) > 3)) {
      setError('Invalid input. Please enter a number of 1, 2, or 3.');
    } else if (!error && searchTerm.trim() && !isNaN(Number(searchTerm)) && Number(searchTerm) <= 3) {
      setError('');
    }
  }, [searchTerm, error]);

  const handleSubmit = () => {
    handleSearch();
  };

  return (
    <div className="recipe-search-main-container">
      <h1>Recipe App</h1>
      <div className="search-container">
        <label>
          How many recipes (Max 3):
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </label>
        <button onClick={handleSubmit}>Search</button>
        {error && <p className="error-message">{error}</p>}
      </div>
      <div className='recipe-container'>
        {recipeData && recipeData.recipes ? (
          <div>
            {recipeData.recipes.slice(0, 3).map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <p>Waiting for selection</p>
        )}
      </div>
    </div>
  );
};

export default RecipeSearch;



// Ensure to rate limit the search button, possibly use Signal
// to prevent API abuse.