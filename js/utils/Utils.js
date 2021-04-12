/**
 *
 * @param target
 * @return {boolean}
 */
export function isDropdownContent(target) {
  return (
    target.className === "ingredient" ||
    target.className === "appareil" ||
    target.className === "ustensil"
  );
}

/**
 *
 * @param target {HTMLElement}
 * @return {boolean}
 */
export function isDropdownSearch(target) {
  return target.id !== "search";
}

/**
 *
 * @param dropdown {HTMLElement}
 * @return {boolean}
 */
export function isOpen(dropdown) {
  return dropdown.style.display === "flex";
}

/**
 *
 * @param id {string}
 * @param ingredients {Ingredient[]}
 * @param appliances {string[]}
 * @param ustensils {Ustensil[]}
 * @return {number}
 */
export function getDropdownWidth(id, ingredients, appliances, ustensils) {
  let width = 17.43;
  switch (id) {
    case "blue-content":
      if (ingredients.length > 30) {
        width = 52.29;
      }
      break;
    case "green-content":
      if (appliances.length > 30) {
        width = 52.29;
      }
      break;
    case "red-content":
      if (ustensils.length > 30) {
        width = 52.29;
      }
      break;
  }
  return width;
}

/**
 *
 * @param id {string}
 * @param ingredients {Ingredient[]}
 * @param appliances {string[]}
 * @param ustensils {Ustensil[]}
 * @return {number}
 */
export function getDropdownMaxheight(id, ingredients, appliances, ustensils) {
  let maxHeight = 55;
  switch (id) {
    case "blue-content":
      if (ingredients.length > 30) {
        maxHeight = (ingredients.length / 3) * 1.6;
      }
      break;
    case "green-content":
      if (appliances.length > 30) {
        maxHeight = (appliances.length / 3) * 1.6;
      }
      break;
    case "red-content":
      if (ustensils.length > 30) {
        maxHeight = (ustensils.length / 3) * 1.6;
      }
      break;
  }
  return maxHeight;
}
