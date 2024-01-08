import React from 'react';
import DOMPurify from 'dompurify';
import './RecipeCard.css';

const RecipeCard = ({ recipe }) => {
  const {
    title,
    image,
    summary,
    sourceUrl,
    readyInMinutes,
    servings,
  } = recipe;

  const sanitizedSummary = DOMPurify.sanitize(summary);

  return (
    <div className="recipe-card">
      <div className="recipe-card-left">
        <h2>{title}</h2>
        <img src={image} alt={title} />
      </div>
      <div className="recipe-card-right">
        <p dangerouslySetInnerHTML={{ __html: sanitizedSummary }}></p>
        <p>Ready in {readyInMinutes} minutes | Servings: {servings}</p>
        <a href={sourceUrl} target="_blank" rel="noopener noreferrer">
          View Recipe
        </a>
      </div>
    </div>
  );
};

export default RecipeCard;