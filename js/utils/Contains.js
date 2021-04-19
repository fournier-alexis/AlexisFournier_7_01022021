/**
 *
 * @param ingredients {Ingredient[]}
 * @param ingredient {Ingredient}
 * @return {boolean}
 */
export function isIngredientContain(ingredients, ingredient) {
  let contain = false;
  ingredients.forEach((ing) => {
    if (
      !contain &&
      ing.ingredient.toLowerCase() === ingredient.ingredient.toLowerCase()
    ) {
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
 * @param ustensils {Ustensil[]}
 * @param ustensil {Ustensil}
 * @return {boolean}
 */
export function isUstensilContain(ustensils, ustensil) {
  let contain = false;
  ustensils.forEach((ust) => {
    if (!contain && ust.name.toLowerCase() === ustensil.name.toLowerCase()) {
      contain = true;
    }
  });
  return contain;
}
