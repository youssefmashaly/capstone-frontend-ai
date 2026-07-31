import { Link, useParams } from 'react-router-dom';
import { useRecipeDetail } from '../hooks/useRecipeDetail.ts';
import { getMealIngredients } from '../types/meal.ts';

export function RecipeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { meal, loading, error } = useRecipeDetail(id);

  if (loading) {
    return (
      <main className="app recipe-detail">
        <p className="recipe-detail__status">Loading recipe...</p>
      </main>
    );
  }

  if (error || !meal) {
    return (
      <main className="app recipe-detail">
        <Link to="/" className="recipe-detail__back">
          Back to results
        </Link>
        <p className="app__error">{error ?? 'Recipe not found.'}</p>
      </main>
    );
  }

  const ingredients = getMealIngredients(meal);

  return (
    <main className="app recipe-detail">
      <Link to="/" className="recipe-detail__back">
        Back to results
      </Link>

      <article className="recipe-detail__content">
        <header className="recipe-detail__header">
          <img
            className="recipe-detail__image"
            src={meal.strMealThumb}
            alt=""
          />
          <div>
            <h1 className="recipe-detail__title">{meal.strMeal}</h1>
            <p className="recipe-detail__meta">
              {meal.strCategory} · {meal.strArea}
            </p>
          </div>
        </header>

        <section className="recipe-detail__section" aria-labelledby="ingredients-heading">
          <h2 id="ingredients-heading">Ingredients</h2>
          <ul className="recipe-detail__ingredients">
            {ingredients.map((item) => (
              <li key={item.ingredient}>
                {item.measure ? `${item.measure} ` : ''}
                {item.ingredient}
              </li>
            ))}
          </ul>
        </section>

        <section className="recipe-detail__section" aria-labelledby="instructions-heading">
          <h2 id="instructions-heading">Instructions</h2>
          <div className="recipe-detail__instructions">
            {meal.strInstructions.split(/\r?\n/).map((paragraph, index) => {
              const trimmedParagraph = paragraph.trim();

              if (!trimmedParagraph) {
                return null;
              }

              return <p key={index}>{trimmedParagraph}</p>;
            })}
          </div>
        </section>
      </article>
    </main>
  );
}
