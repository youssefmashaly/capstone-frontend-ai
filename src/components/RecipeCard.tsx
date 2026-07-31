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

  return (
    <li className="recipe-card">
      <div className="recipe-card__media">
        <img
          className="recipe-card__image"
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          loading="lazy"
        />
        <button
          type="button"
          className={`recipe-card__favorite${isFavorite ? ' recipe-card__favorite--active' : ''}`}
          aria-pressed={isFavorite}
          aria-label={favoriteLabel}
          onClick={() => onToggleFavorite(recipe.idMeal)}
        >
          <span aria-hidden="true">{isFavorite ? '♥' : '♡'}</span>
          <span className="recipe-card__favorite-label">{favoriteLabel}</span>
        </button>
      </div>
      <h2 className="recipe-card__title">{recipe.strMeal}</h2>
    </li>
  );
}
