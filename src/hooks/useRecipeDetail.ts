import { useEffect, useState } from 'react';
import { getMealById } from '../services/mealApi.ts';
import type { Meal } from '../types/meal.ts';

export function useRecipeDetail(id: string | undefined) {
  const [meal, setMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(Boolean(id));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setMeal(null);
      setLoading(false);
      setError('Recipe not found.');
      return;
    }

    let cancelled = false;

    setLoading(true);
    setError(null);
    setMeal(null);

    getMealById(id)
      .then((result) => {
        if (cancelled) {
          return;
        }

        if (!result) {
          setError('Recipe not found.');
          setMeal(null);
          return;
        }

        setMeal(result);
      })
      .catch((err) => {
        if (cancelled) {
          return;
        }

        setError(
          err instanceof Error ? err.message : 'Something went wrong',
        );
        setMeal(null);
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  return { meal, loading, error };
}
