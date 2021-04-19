import RecipeComponent from "../components/RecipeComponent";
import NoRecipesComponent from "../components/NoRecipesComponent";
import { isDropdownSearch } from "../utils/Utils";
import { DropdownController } from "./DropdownController";
import {
  isApplianceContainValue,
  isDescriptionContainValue,
  isIngredientsContainValue,
  isNameContainValue,
  isUstensilsContainValue,
} from "../utils/Sort";

export default class Controller {
  static listRecipe = [];
  static listIngredients = [];
  static listAppliance = [];
  static listUstensils = [];

  /**
   * @return {Controller}
   */
  constructor() {
    this.addEventsListeners();
    this.filters = [];
    this.dropdownController = new DropdownController(this);
  }

  /**
   *
   * @param ingredient {Ingredient}
   * @return {void}
   */
  static addIngredient(ingredient) {
    let contain = false;
    Controller.listIngredients.forEach((ing) => {
      if (
        !contain &&
        ing.ingredient.toLowerCase() === ingredient.ingredient.toLowerCase()
      ) {
        contain = true;
      }
    });
    !contain && Controller.listIngredients.push(ingredient);
  }

  /**
   *
   * @param ustensil {Ustensil}
   * @return {void}
   */
  static addUstensil(ustensil) {
    let contain = false;
    Controller.listUstensils.forEach((ust) => {
      if (!contain && ust.name.toLowerCase() === ustensil.name.toLowerCase()) {
        contain = true;
      }
    });
    !contain && Controller.listUstensils.push(ustensil);
  }

  /**
   * @return {void}
   */
  addEventsListeners() {
    document
      .getElementById("search")
      .addEventListener("keyup", this.onSearchChange.bind(this));
  }

  /**
   *
   * @param event
   * @return {void}
   */
  onSearchChange(event) {
    if (event.target.value.length >= 3) {
      if (isDropdownSearch(event.target)) {
        this.sortFilter(event.target.value, event.target.id);
      } else {
        this.currentRecipes = this.sortByName(event.target.value);
        this.updateRecipes();
        this.dropdownController.updateDropdownValues();
      }
    } else {
      if (!isDropdownSearch(event.target)) {
        this.updateRecipes();
      }
      this.dropdownController.updateDropdownValues();
    }
  }

  /**
   * @return {void}
   */
  updateRecipes() {
    document.getElementById("cards").innerHTML = "";
    document.querySelectorAll(".recipe").forEach((recipe) => {
      document
        .getElementById("cards")
        .appendChild(new RecipeComponent(recipe).createElement());
    });
    if (this.currentRecipes.length === 0) {
      document
        .getElementById("cards")
        .appendChild(new NoRecipesComponent().createElement());
    }
  }

  /**
   *
   * @param tag {Tag}
   * @return {void}
   */
  removeTag(tag) {
    this.filters = this.filters.filter((filter) => filter.value !== tag.value);
    this.currentRecipes = this.sortByTags();
    this.updateRecipes();
    this.dropdownController.updateDropdownValues();
    this.updateFilters();
  }

  /**
   * @return {void}
   */
  updateFilters() {
    const tags = document.getElementById("tags");
    tags.innerHTML = "";
    this.filters.forEach((tag) => {
      const div = document.createElement("div");
      div.className = `tag ${tag.type.substr(0, 3)}`;
      div.textContent = tag.value;
      div.addEventListener("click", this.removeTag.bind(this, tag));
      tags.appendChild(div);
    });
  }

  /**
   *
   * @param value {string}
   * @param context {string}
   * @return {void}
   */
  sortFilter(value, context) {
    switch (context) {
      case "ingredients":
        this.currentIngredients = this.currentIngredients.filter((ing) =>
          ing.ingredient.toLowerCase().includes(value.toLowerCase())
        );
        this.dropdownController.updateIngredients();
        break;
      case "appareil":
        this.currentAppliances = this.currentAppliances.filter((app) =>
          app.toLowerCase().includes(value.toLowerCase())
        );
        this.dropdownController.updateAppliance();
        break;
      case "ustensiles":
        this.currentUstensils = this.currentUstensils.filter((ust) =>
          ust.name.toLowerCase().includes(value.toLowerCase())
        );
        this.dropdownController.updateUstensil();
        break;
    }
  }

  /**
   *
   * @param value {string}
   * @return {[]}
   */
  sortByName(value) {
    let filteredRecipes = [];
    this.sortByTags().forEach((recipe) => {
      if (
        isNameContainValue(recipe, value) ||
        isDescriptionContainValue(recipe, value) ||
        isIngredientsContainValue(recipe, value)
      )
        filteredRecipes.push(recipe);
    });
    return filteredRecipes;
  }

  /**
   *
   * @return {Recipe[]}
   */
  sortByTags() {
    let filteredRecipes = document.querySelectorAll(".recipe");
    this.filters.forEach((filter) => {
      switch (filter.type) {
        case "ingredient":
          filteredRecipes = filteredRecipes.filter((recipe) =>
            isIngredientsContainValue(recipe, filter.value)
          );
          break;
        case "appareil":
          filteredRecipes = filteredRecipes.filter((recipe) =>
            isApplianceContainValue(recipe, filter.value)
          );
          break;
        case "ustensil":
          filteredRecipes = filteredRecipes.filter((recipe) =>
            isUstensilsContainValue(recipe, filter.value)
          );
          break;
      }
    });
    return filteredRecipes;
  }
}
