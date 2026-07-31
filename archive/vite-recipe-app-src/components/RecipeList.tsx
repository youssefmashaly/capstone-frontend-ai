import { RecipeCard } from './RecipeCard.tsx';
import { useFavorites } from '../hooks/useFavorites.ts';
import type { Meal } from '../types/meal.ts';

type RecipeListProps = {
  recipes: Meal[];
  searchedQuery?: string | null;
};

export function RecipeList({ recipes, searchedQuery = null }: RecipeListProps) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const handleToggleFavorite = (id: string) => {
    if (isFavorite(id)) {
      removeFavorite(id);
    } else {
      addFavorite(id);
    }
  };

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
        <RecipeCard
          key={recipe.idMeal}
          recipe={recipe}
          isFavorite={isFavorite(recipe.idMeal)}
          onToggleFavorite={handleToggleFavorite}
        />
      ))}
    </ul>
  );
}
