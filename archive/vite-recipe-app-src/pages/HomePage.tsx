import { RecipeList, SearchBar } from '../components/index.ts';
import { useRecipes } from '../hooks/useRecipes.ts';

export function HomePage() {
  const { results, loading, error, lastQuery, hasSearched, search } =
    useRecipes();

  return (
    <main className="app">
      <header className="app__header">
        <h1>Recipe Finder</h1>
        <p>Search TheMealDB for recipes by name.</p>
      </header>

      <SearchBar onSearch={search} loading={loading} />

      {error && <p className="app__error">{error}</p>}

      {!loading && !error && !hasSearched && (
        <p className="app__empty">Search for a recipe to get started.</p>
      )}

      <RecipeList
        recipes={results}
        searchedQuery={hasSearched ? lastQuery : null}
      />
    </main>
  );
}
