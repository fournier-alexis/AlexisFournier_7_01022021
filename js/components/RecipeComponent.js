export default class RecipeComponent {
  /**
   * Create a recipe DOM component
   * @param recipe {Recipe}
   */
  constructor(recipe) {
    this.recipe = recipe;
  }

  /**
   * @returns {HTMLElement}
   */
  createElement() {
    let recipe = document.createElement("article");
    recipe.className = "recipe";
    recipe.appendChild(this.createImage());
    recipe = this.addDatas(recipe);

    const content = document.createElement("div");
    content.className = "content";
    content.appendChild(this.createInformations());
    content.appendChild(this.createDescription());

    recipe.appendChild(content);

    return recipe;
  }

  /**
   * Add all data attribute
   * @param recipe {HTMLElement}
   * @return {HTMLElement}
   */
  addDatas(recipe) {
    const recipeWidthDatas = recipe;
    recipeWidthDatas.dataset.id = this.recipe.id.toString();
    recipeWidthDatas.dataset.name = this.recipe.name;
    recipeWidthDatas.dataset.servings = this.recipe.servings.toString();
    recipeWidthDatas.dataset.ingredients = JSON.stringify(
      this.recipe.ingredients
    );
    recipeWidthDatas.dataset.time = this.recipe.time.toString();
    recipeWidthDatas.dataset.description = this.recipe.description;
    recipeWidthDatas.dataset.appliance = this.recipe.appliance;
    recipeWidthDatas.dataset.ustensils = JSON.stringify(this.recipe.ustensils);

    return recipeWidthDatas;
  }

  /**
   *
   * @return {HTMLImageElement}
   */
  createImage() {
    const image = document.createElement("img");

    image.src = "src/default-image.svg";
    image.alt = "Image par défaut";

    return image;
  }

  createInformations() {
    const informations = document.createElement("div");
    informations.className = "informations";

    const title = document.createElement("h1");
    title.textContent = this.recipe.name;

    const time = document.createElement("h2");
    time.textContent = this.recipe.time.toString();

    informations.appendChild(title);
    informations.appendChild(time);

    return informations;
  }

  createDescription() {
    const description = document.createElement("div");
    description.className = "description";

    const list = document.createElement("ul");
    this.recipe.ingredients.forEach((ingredient) => {
      const ingredientHtml = document.createElement("li");
      ingredientHtml.textContent = ingredient.toString();
      list.appendChild(ingredientHtml);
    });

    const steps = document.createElement("p");
    steps.textContent = this.recipe.description;

    description.appendChild(list);
    description.appendChild(steps);
    return description;
  }
}
