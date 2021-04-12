import {
  isApplianceContain,
  isIngredientContain,
  isUstensilContain,
} from "./Contains";

/**
 *
 * @param recipes {Recipe[]}
 * @return {Ingredient[]}
 */
export function getAllIngredients(recipes) {
  let ingredients = [];
  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ing) => {
      !isIngredientContain(ingredients, ing) && ingredients.push(ing);
    });
  });
  return ingredients;
}

/**
 *
 * @param recipes {Recipe[]}
 * @return {string[]}
 */
export function getAllAppliance(recipes) {
  let appliances = [];
  recipes.forEach((recipe) => {
    !isApplianceContain(appliances, recipe.appliance) &&
      appliances.push(recipe.appliance);
  });
  return appliances;
}

/**
 *
 * @param recipes {Recipe[]}
 * @return {Ustensil[]}
 */
export function getAllUstensil(recipes) {
  const ustensils = [];
  recipes.forEach((recipe) => {
    recipe.ustensils.forEach((ust) => {
      !isUstensilContain(ustensils, ust) && ustensils.push(ust);
    });
  });
  return ustensils;
}
