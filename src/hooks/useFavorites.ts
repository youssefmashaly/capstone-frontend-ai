import { useCallback, useEffect, useState } from 'react';

const FAVORITES_STORAGE_KEY = 'recipe-favorites';

function readFavoritesFromStorage(): string[] {
  try {
    const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);

    if (!stored) {
      return [];
    }

    const parsed: unknown = JSON.parse(stored);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter((id): id is string => typeof id === 'string');
  } catch {
    return [];
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(() =>
    readFavoritesFromStorage(),
  );

  useEffect(() => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = useCallback((id: string) => {
    setFavorites((current) =>
      current.includes(id) ? current : [...current, id],
    );
  }, []);

  const removeFavorite = useCallback((id: string) => {
    setFavorites((current) => current.filter((favoriteId) => favoriteId !== id));
  }, []);

  const isFavorite = useCallback(
    (id: string) => favorites.includes(id),
    [favorites],
  );

  return { favorites, addFavorite, removeFavorite, isFavorite };
}
