import type { Meal } from '../types/meal.ts';

type RecipeListProps = {
  recipes: Meal[];
};

export function RecipeList({ recipes }: RecipeListProps) {
  if (recipes.length === 0) {
    return null;
  }

  return (
    <ul className="recipe-list">
      {recipes.map((recipe) => (
        <li key={recipe.idMeal} className="recipe-card">
          <img
            className="recipe-card__image"
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            loading="lazy"
          />
          <h2 className="recipe-card__title">{recipe.strMeal}</h2>
        </li>
      ))}
    </ul>
  );
}
