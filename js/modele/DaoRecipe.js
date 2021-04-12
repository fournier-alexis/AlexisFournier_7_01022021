import Recipe from "../metier/Recipe";
import Controller from "../controller/Controller";

/**Class data access object recipe */
export default class DaoRecipe {
  /**
   *
   * @param recipes {Recipe[]}
   */
  constructor(recipes) {
    this.recipes = recipes;
  }

  /**
   * @return {void}
   */
  createRecipes() {
    const listRecipes = [];
    this.recipes.forEach((recipe) => {
      listRecipes.push(
        new Recipe(
          recipe.id,
          recipe.name,
          recipe.servings,
          recipe.ingredients,
          recipe.time,
          recipe.description,
          recipe.appliance,
          recipe.ustensils
        )
      );
    });
    Controller.listRecipe = listRecipes;
  }
}
