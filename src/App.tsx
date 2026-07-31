import { RecipeList, SearchBar } from './components/index.ts';
import { useRecipes } from './hooks/useRecipes.ts';
import './App.css';

function App() {
  const { results, loading, error, search } = useRecipes();

  return (
    <main className="app">
      <header className="app__header">
        <h1>Recipe Finder</h1>
        <p>Search TheMealDB for recipes by name.</p>
      </header>

      <SearchBar onSearch={search} loading={loading} />

      {error && <p className="app__error">{error}</p>}

      {!loading && !error && results.length === 0 && (
        <p className="app__empty">Search for a recipe to get started.</p>
      )}

      <RecipeList recipes={results} />
    </main>
  );
}

export default App;
