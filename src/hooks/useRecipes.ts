import { useCallback, useState } from 'react';
import { searchMeals } from '../services/mealApi.ts';
import type { Meal } from '../types/meal.ts';

export function useRecipes() {
  const [results, setResults] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastQuery, setLastQuery] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const search = useCallback(async (query: string) => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      return;
    }

    setLoading(true);
    setError(null);
    setLastQuery(trimmedQuery);

    try {
      const meals = await searchMeals(trimmedQuery);
      setResults(meals);
      setHasSearched(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setResults([]);
      setHasSearched(true);
    } finally {
      setLoading(false);
    }
  }, []);

  return { results, loading, error, lastQuery, hasSearched, search };
}
