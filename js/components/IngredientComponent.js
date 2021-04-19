export default class IngredientComponent {
  /**
   * Create a recipe DOM component
   * @param ingredient {Ingredient}
   */
  constructor(ingredient) {
    this.ingredient = ingredient;
  }

  /**
   * @returns {HTMLElement}
   */
  createElement() {
    const div = document.createElement("div");
    div.className = "ingredient";
    div.textContent = this.ingredient.ingredient;

    return div;
  }
}
