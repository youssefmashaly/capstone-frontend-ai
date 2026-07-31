import { useState, type FormEvent } from 'react';

type SearchBarProps = {
  onSearch: (query: string) => void;
  loading?: boolean;
};

export function SearchBar({ onSearch, loading = false }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
      />
      <button
        type="submit"
        className="search-bar__button"
        disabled={loading}
      >
        {loading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
}
