import type { Meal } from '../types/meal.ts';

type RecipeListProps = {
  recipes: Meal[];
  searchedQuery?: string | null;
};

export function RecipeList({ recipes, searchedQuery = null }: RecipeListProps) {
  if (recipes.length === 0) {
    if (searchedQuery) {
      return (
        <p className="recipe-list__empty">
          No recipes found for &lsquo;{searchedQuery}&rsquo;
        </p>
      );
    }

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
