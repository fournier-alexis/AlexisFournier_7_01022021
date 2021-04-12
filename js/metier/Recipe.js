/**Class representing a recipe */
import Ingredient from "./Ingredient";
import Ustensil from "./Ustensil";
import Controller from "../controller/Controller";

export default class Recipe {
  /**
   * Create a recipe
   * @param id {number}
   * @param name {string}
   * @param servings {number}
   * @param ingredients {Ingredient[]}
   * @param time {number}
   * @param description {string}
   * @param appliance {string}
   * @param ustensils {Ustensil[]}
   * @return {Recipe}
   */
  constructor(
    id,
    name,
    servings,
    ingredients,
    time,
    description,
    appliance,
    ustensils
  ) {
    this.id = id;
    this.name = name;
    this.servings = servings;
    this.ingredients = this.createIngredients(ingredients);
    this.time = time;
    this.description = description;
    this.appliance = appliance;
    this.ustensils = this.createUstensils(ustensils);

    !Controller.listAppliance.includes(appliance) &&
      Controller.listAppliance.push(appliance);
  }

  /**
   * Create en return an array of ingredient
   * @param ingredients
   * @return {Ingredient[]}
   */
  createIngredients(ingredients) {
    const listIngredients = [];

    ingredients.forEach((ingredient) => {
      const ing = new Ingredient(
        ingredient.ingredient,
        ingredient.quantity,
        ingredient.unit
      );
      Controller.addIngredient(ing);
      listIngredients.push(ing);
    });

    return listIngredients;
  }

  /**
   * Create en return an array of ustensils
   * @param ustensils
   * @return {Ustensil[]}
   */
  createUstensils(ustensils) {
    const listUstensils = [];
    ustensils.forEach((ustensil) => {
      const ust = new Ustensil(ustensil);
      Controller.addUstensil(ust);
      listUstensils.push(ust);
    });

    return listUstensils;
  }
}
