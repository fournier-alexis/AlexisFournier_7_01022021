/**
 *
 * @param recipe {Recipe}
 * @param value {string}
 * @return {boolean}
 */
export function isNameContainValue(recipe, value) {
  return recipe.name.toLowerCase().includes(value.toLowerCase());
}

/**
 *
 * @param recipe {Recipe}
 * @param value {string}
 * @return {boolean}
 */
export function isDescriptionContainValue(recipe, value) {
  return recipe.description.toLowerCase().includes(value.toLowerCase());
}

/**
 *
 * @param recipe {Recipe}
 * @param value
 * @return {boolean}
 */
export function isApplianceContainValue(recipe, value) {
  return recipe.appliance.toLowerCase().includes(value.toLowerCase());
}

/**
 *
 * @param recipe {Recipe}
 * @param value {string}
 * @return {boolean}
 */
export function isIngredientsContainValue(recipe, value) {
  let isContain = false;

  recipe.ingredients.forEach((ingredient) => {
    if (
      !isContain &&
      ingredient.ingredient.toLowerCase().includes(value.toLowerCase())
    ) {
      isContain = true;
    }
  });

  return isContain;
}

/**
 *
 * @param recipe {Recipe}
 * @param value
 * @return {boolean}
 */
export function isUstensilsContainValue(recipe, value) {
  let isContain = false;
  recipe.ustensils.forEach((ustensil) => {
    if (
      !isContain &&
      ustensil.name.toString().toLowerCase().includes(value.toLowerCase())
    ) {
      isContain = true;
    }
  });

  return isContain;
}
