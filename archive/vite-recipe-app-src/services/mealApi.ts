import type { Meal, MealSearchResponse } from '../types/meal.ts';

const MEAL_DB_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export async function searchMeals(query: string): Promise<Meal[]> {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return [];
  }

  const url = `${MEAL_DB_BASE_URL}/search.php?s=${encodeURIComponent(trimmedQuery)}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to search meals (${response.status})`);
  }

  const data = (await response.json()) as MealSearchResponse;

  return data.meals ?? [];
}

export async function getMealById(id: string): Promise<Meal | null> {
  const url = `${MEAL_DB_BASE_URL}/lookup.php?i=${encodeURIComponent(id)}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch recipe (${response.status})`);
  }

  const data = (await response.json()) as MealSearchResponse;

  return data.meals?.[0] ?? null;
}
