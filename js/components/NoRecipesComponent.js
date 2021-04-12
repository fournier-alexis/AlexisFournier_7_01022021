export default class NoRecipesComponent {
  /**
   * Create a noRecipe DOM component
   */
  constructor() {}

  /**
   * @returns {HTMLElement}
   */
  createElement() {
    const div = document.createElement("div");
    div.className = "noRecipes";
    div.textContent =
      "Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.";

    return div;
  }
}
