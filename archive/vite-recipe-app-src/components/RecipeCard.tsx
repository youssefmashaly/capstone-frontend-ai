import { Link } from 'react-router-dom';
import type { MouseEvent } from 'react';
import type { Meal } from '../types/meal.ts';

type RecipeCardProps = {
  recipe: Meal;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
};

export function RecipeCard({
  recipe,
  isFavorite,
  onToggleFavorite,
}: RecipeCardProps) {
  const favoriteLabel = isFavorite
    ? 'Remove from favorites'
    : 'Add to favorites';

  const handleToggleFavorite = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    onToggleFavorite(recipe.idMeal);
  };

  return (
    <li className="recipe-card">
      <Link
        to={`/recipe/${recipe.idMeal}`}
        className="recipe-card__link"
      >
        <div className="recipe-card__media">
          <img
            className="recipe-card__image"
            src={recipe.strMealThumb}
            alt=""
          />
        </div>
        <h2 className="recipe-card__title">{recipe.strMeal}</h2>
      </Link>
      <button
        type="button"
        className={`recipe-card__favorite${isFavorite ? ' recipe-card__favorite--active' : ''}`}
        aria-pressed={isFavorite}
        aria-label={favoriteLabel}
        onClick={handleToggleFavorite}
      >
        <span aria-hidden="true">{isFavorite ? '♥' : '♡'}</span>
        <span className="recipe-card__favorite-label">{favoriteLabel}</span>
      </button>
    </li>
  );
}
