import {
  isApplianceContain,
  isIngredientContain,
  isUstensilContain,
} from "./Contains";

/**
 *
 * @param recipes {HTMLElement[]}
 * @return {String[]}
 */
export function getAllIngredients(recipes) {
  let ingredients = [];
  recipes.forEach((recipe) => {
    JSON.parse(recipe.dataset.ingredients).forEach((ing) => {
      !isIngredientContain(ingredients, ing) && ingredients.push(ing);
    });
  });
  return ingredients;
}

/**
 *
 * @param recipes {HTMLElement[]}
 * @return {string[]}
 */
export function getAllAppliance(recipes) {
  let appliances = [];
  recipes.forEach((recipe) => {
    !isApplianceContain(appliances, recipe.dataset.appliance) &&
      appliances.push(recipe.dataset.appliance);
  });
  return appliances;
}

/**
 *
 * @param recipes {HTMLElement[]}
 * @return {String[]}
 */
export function getAllUstensil(recipes) {
  const ustensils = [];
  recipes.forEach((recipe) => {
    JSON.parse(recipe.dataset.ustensils).forEach((ust) => {
      !isUstensilContain(ustensils, ust) && ustensils.push(ust);
    });
  });
  return ustensils;
}
