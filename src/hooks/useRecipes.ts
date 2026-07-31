import { useCallback, useState } from 'react';
import { searchMeals } from '../services/mealApi.ts';
import type { Meal } from '../types/meal.ts';

export function useRecipes() {
  const [results, setResults] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (query: string) => {
    setLoading(true);
    setError(null);

    try {
      const meals = await searchMeals(query);
      setResults(meals);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return { results, loading, error, search };
}
