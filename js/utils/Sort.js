/**
 *
 * @param recipe {HTMLElement}
 * @param value {string}
 * @return {boolean}
 */
export function isNameContainValue(recipe, value) {
  return recipe.dataset.name.toLowerCase().includes(value.toLowerCase());
}

/**
 *
 * @param recipe {HTMLElement}
 * @param value {string}
 * @return {boolean}
 */
export function isDescriptionContainValue(recipe, value) {
  return recipe.dataset.description.toLowerCase().includes(value.toLowerCase());
}

/**
 *
 * @param recipe {HTMLElement}
 * @param value
 * @return {boolean}
 */
export function isApplianceContainValue(recipe, value) {
  return recipe.dataset.appliance.toLowerCase().includes(value.toLowerCase());
}

/**
 *
 * @param recipe {HTMLElement}
 * @param value {string}
 * @return {boolean}
 */
export function isIngredientsContainValue(recipe, value) {
  let isContain = false;

  JSON.parse(recipe.dataset.ingredients).forEach((ingredient) => {
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
 * @param recipe {HTMLElement}
 * @param value
 * @return {boolean}
 */
export function isUstensilsContainValue(recipe, value) {
  let isContain = false;
  JSON.parse(recipe.dataset.ustensils).forEach((ustensil) => {
    if (
      !isContain &&
      ustensil.name.toString().toLowerCase().includes(value.toLowerCase())
    ) {
      isContain = true;
    }
  });

  return isContain;
}
