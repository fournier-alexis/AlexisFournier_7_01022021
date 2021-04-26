/**
 *
 * @param ingredients {String[]}
 * @param ingredient {String}
 * @return {boolean}
 */
export function isIngredientContain(ingredients, ingredient) {
  let contain = false;
  ingredients.forEach((ing) => {
    if (!contain && ing.toLowerCase() === ingredient.toLowerCase()) {
      contain = true;
    }
  });
  return contain;
}

/**
 *
 * @param appliances {String[]}
 * @param appliance {String}
 * @return {boolean}
 */
export function isApplianceContain(appliances, appliance) {
  let contain = false;
  appliances.forEach((app) => {
    if (!contain && app.toLowerCase() === appliance.toLowerCase()) {
      contain = true;
    }
  });
  return contain;
}

/**
 *
 * @param ustensils {String[]}
 * @param ustensil {String}
 * @return {boolean}
 */
export function isUstensilContain(ustensils, ustensil) {
  let contain = false;
  ustensils.forEach((ust) => {
    if (!contain && ust.toLowerCase() === ustensil.toLowerCase()) {
      contain = true;
    }
  });
  return contain;
}
