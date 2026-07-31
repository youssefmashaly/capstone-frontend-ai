type IngredientIndex =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20;

type MealIngredientFields = {
  [K in IngredientIndex as `strIngredient${K}`]: string | null;
};

type MealMeasureFields = {
  [K in IngredientIndex as `strMeasure${K}`]: string | null;
};

export type Meal = {
  idMeal: string;
  strMeal: string;
  strMealAlternate: string | null;
  strCategory: string;
  strArea: string;
  strCountry: string | null;
  strInstructions: string;
  strMealThumb: string;
  strTags: string | null;
  strYoutube: string;
  strSource: string | null;
  strImageSource: string | null;
  strCreativeCommonsConfirmed: string | null;
  dateModified: string | null;
} & MealIngredientFields &
  MealMeasureFields;

export type MealSearchResponse = {
  meals: Meal[] | null;
};
