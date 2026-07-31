import { useState, type FormEvent } from 'react';

type SearchBarProps = {
  onSearch: (query: string) => void;
  loading?: boolean;
};

export function SearchBar({ onSearch, loading = false }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const isQueryEmpty = query.trim().length === 0;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isQueryEmpty) {
      return;
    }

    onSearch(query);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="search"
        className="search-bar__input"
        placeholder="Search recipes..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        aria-label="Recipe search"
        aria-describedby={isQueryEmpty ? 'search-bar-hint' : undefined}
      />
      <button
        type="submit"
        className="search-bar__button"
        disabled={loading || isQueryEmpty}
      >
        {loading ? 'Searching...' : 'Search'}
      </button>
      {isQueryEmpty && (
        <p id="search-bar-hint" className="search-bar__hint">
          Enter a search term to find recipes.
        </p>
      )}
    </form>
  );
}
