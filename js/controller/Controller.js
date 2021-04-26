import { isDropdownSearch } from "../utils/Utils";
import { DropdownController } from "./DropdownController";
import {
  isApplianceContainValue,
  isDescriptionContainValue,
  isIngredientsContainValue,
  isNameContainValue,
  isUstensilsContainValue,
} from "../utils/Sort";
import {
  getAllAppliance,
  getAllIngredients,
  getAllUstensil,
} from "../utils/GetAllValues";

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
   * @return {HTMLElement[]}
   */
  getCurrentRecipes() {
    const recipes = [];
    document.querySelectorAll(".recipe").forEach((recipe) => {
      recipe.style.display !== "none" && recipes.push(recipe);
    });
    return recipes;
  }

  /**
   *
   * @param event
   * @return {void}
   */
  onSearchChange(event) {
    let isUpdate = false;
    if (event.target.value.length >= 3) {
      isUpdate = true;
      if (isDropdownSearch(event.target)) {
        this.sortFilter(event.target.value, event.target.id);
      } else {
        this.updateRecipes(this.sortByTags(false), this.sortByTags(true));
        this.updateRecipes(
          this.sortByName(event.target.value, false),
          this.sortByName(event.target.value, true)
        );
        this.dropdownController.updateDropdownValues();
      }
    } else {
      this.updateRecipes(this.sortByTags(false), this.sortByTags(true));
    }
    !isUpdate && this.dropdownController.updateDropdownValues();
  }

  /**
   *
   * @param recipesToDisplay
   * @param recipesToRemove
   * @return {void}
   */
  updateRecipes(recipesToDisplay, recipesToRemove) {
    console.log("ici");
    recipesToRemove.forEach((recipe) => {
      recipe.style.display = "none";
    });

    recipesToDisplay.forEach((recipe) => {
      recipe.style.display = "flex";
    });

    if (this.getCurrentRecipes().length === 0) {
      document.getElementById("noRecipes").style.display = "block";
    } else {
      document.getElementById("noRecipes").style.display = "none";
    }
  }

  /**
   * Remove an active tag
   * @param tag {Tag}
   * @return {void}
   */
  removeTag(tag) {
    this.filters = this.filters.filter((filter) => filter.value !== tag.value);
    if (this.filters.length > 0) {
      this.updateRecipes(this.sortByTags(false), this.sortByTags(true));
    } else {
      this.updateRecipes(document.querySelectorAll(".recipe"), []);
    }
    this.updateRecipes(
      this.sortByName(document.getElementById("search").value, false),
      this.sortByName(document.getElementById("search").value, true)
    );
    this.dropdownController.updateDropdownValues();
    this.updateFilters();
  }

  /**
   * Update tags in filters
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
   * Sort filters values
   * @param value {string}
   * @param context {string}
   * @return {void}
   */
  sortFilter(value, context) {
    switch (context) {
      case "ingredients":
        this.dropdownController.updateIngredients(
          getAllIngredients(this.getCurrentRecipes()).filter((ing) =>
            ing.toLowerCase().includes(value.toLowerCase())
          ),
          getAllAppliance(this.getCurrentRecipes()),
          getAllUstensil(this.getCurrentRecipes())
        );
        break;
      case "appareil":
        this.dropdownController.updateAppliance(
          getAllIngredients(this.getCurrentRecipes()),
          getAllAppliance(this.getCurrentRecipes()).filter((app) =>
            app.toLowerCase().includes(value.toLowerCase())
          ),
          getAllUstensil(this.getCurrentRecipes())
        );
        break;
      case "ustensiles":
        this.dropdownController.updateUstensil(
          getAllIngredients(this.getCurrentRecipes()),
          getAllAppliance(this.getCurrentRecipes()),
          getAllUstensil(this.getCurrentRecipes()).filter((ust) =>
            ust.toLowerCase().includes(value.toLowerCase())
          )
        );
        break;
    }
  }

  /**
   * Sort recipes by a string
   * @param value {string}
   * @param doesNotMatch
   * @return {HTMLElement[]}
   */
  sortByName(value, doesNotMatch) {
    let filteredRecipes = [];
    this.getCurrentRecipes().forEach((recipe) => {
      if (
        (doesNotMatch &&
          !isNameContainValue(recipe, value) &&
          !isDescriptionContainValue(recipe, value) &&
          !isIngredientsContainValue(recipe, value)) ||
        (!doesNotMatch &&
          isNameContainValue(recipe, value) &&
          isDescriptionContainValue(recipe, value) &&
          isIngredientsContainValue(recipe, value))
      )
        filteredRecipes.push(recipe);
    });
    return filteredRecipes;
  }

  /**
   * Sort recipes by tag
   * @return {HTMLElement[]}
   */
  sortByTags(doesNotMatch) {
    let filteredRecipes = document.querySelectorAll(".recipe");
    this.filters.forEach((filter) => {
      filteredRecipes = [];
      switch (filter.type) {
        case "ingredient":
          document
            .querySelectorAll(".recipe")
            .forEach(
              (recipe) =>
                ((doesNotMatch &&
                  !isIngredientsContainValue(recipe, filter.value)) ||
                  (!doesNotMatch &&
                    isIngredientsContainValue(recipe, filter.value))) &&
                filteredRecipes.push(recipe)
            );
          break;
        case "appareil":
          document
            .querySelectorAll(".recipe")
            .forEach(
              (recipe) =>
                ((doesNotMatch &&
                  !isApplianceContainValue(recipe, filter.value)) ||
                  (!doesNotMatch &&
                    isApplianceContainValue(recipe, filter.value))) &&
                filteredRecipes.push(recipe)
            );
          break;
        case "ustensil":
          document
            .querySelectorAll(".recipe")
            .forEach(
              (recipe) =>
                ((doesNotMatch &&
                  !isUstensilsContainValue(recipe, filter.value)) ||
                  (!doesNotMatch &&
                    isUstensilsContainValue(recipe, filter.value))) &&
                filteredRecipes.push(recipe)
            );
          break;
      }
    });
    return filteredRecipes;
  }
}
