import Tag from "../metier/Tag";
import {
  getDropdownMaxheight,
  getDropdownWidth,
  isDropdownContent,
  isOpen,
} from "../utils/Utils";
import {
  getAllAppliance,
  getAllIngredients,
  getAllUstensil,
} from "../utils/GetAllValues";

export class DropdownController {
  /**
   *
   * @param controller {Controller}
   * @return {DropdownController}
   */
  constructor(controller) {
    this.controller = controller;
    this.registerListeners();
  }

  /**
   * @return {void}
   */
  registerListeners() {
    document.querySelectorAll(".dropdown").forEach((dropdown) => {
      dropdown.addEventListener("click", (event) => {
        this.onDropdownClick(event, dropdown.id);
      });
      dropdown.addEventListener(
        "keyup",
        this.controller.onSearchChange.bind(this.controller)
      );
    });
  }

  getCurrentIngredients() {
    const currentIngredients = [];
    document.querySelectorAll(".ingredient").forEach((ingredient) => {
      ingredient.style.display !== "none" &&
        currentIngredients.push(ingredient);
    });
    return currentIngredients;
  }

  /**
   *
   * @param event {Event}
   * @param value {string}
   * @return {void}
   */
  onDropdownClick(event, value) {
    const dropdown = document.getElementById(value + "-content");
    if (isDropdownContent(event.target)) {
      this.controller.filters.push(
        new Tag(event.target.className, event.target.textContent)
      );
      this.controller.updateRecipes(
        this.controller.sortByTags(false),
        this.controller.sortByTags(true)
      );
      this.controller.updateRecipes(
        this.controller.sortByName(
          document.getElementById("search").value,
          false
        ),
        this.controller.sortByName(
          document.getElementById("search").value,
          true
        )
      );
      this.controller.updateFilters();
      this.updateDropdownValues();
    }

    this.openDropDown(dropdown);
  }

  /**
   *
   * @param dropdown {HTMLElement}
   * @return {void}
   */
  openDropDown(dropdown) {
    const display = isOpen(dropdown) ? "none" : "flex";
    document.getElementById("blue-content").style.display = "none";
    document.getElementById("red-content").style.display = "none";
    document.getElementById("green-content").style.display = "none";
    dropdown.style.display = display;

    if (display === "flex") {
      dropdown.parentElement.classList.add("opened");

      this.updateDropdownSize(
        dropdown,
        getAllIngredients(this.controller.getCurrentRecipes()),
        getAllAppliance(this.controller.getCurrentRecipes()),
        getAllUstensil(this.controller.getCurrentRecipes())
      );
    } else {
      dropdown.parentElement.classList.remove("opened");
      dropdown.parentElement.children[1].style.width = "auto";
    }
  }

  /**
   * @return {void}
   */
  updateDropdownValues() {
    this.updateDropdowns(
      getAllIngredients(this.controller.getCurrentRecipes()),
      getAllAppliance(this.controller.getCurrentRecipes()),
      getAllUstensil(this.controller.getCurrentRecipes())
    );
  }

  /**
   * @return {void}
   */
  updateDropdowns(ingredients, appliances, ustensils) {
    this.updateIngredients(ingredients, appliances, ustensils);
    this.updateAppliance(ingredients, appliances, ustensils);
    this.updateUstensil(ingredients, appliances, ustensils);
  }

  /**
   * @return {void}
   */
  updateIngredients(ingredients, appliances, ustensils) {
    const div = document.getElementById("blue-content");
    document.querySelectorAll(".ingredient").forEach((ing) => {
      if (!ingredients.includes(ing.textContent)) {
        ing.style.display = "none";
      }
      if (ingredients.includes(ing.textContent)) {
        ing.style.display = "flex";
      }
    });
    this.updateDropdownSize(div, ingredients, appliances, ustensils);
  }

  /**
   * @return {void}
   */
  updateAppliance(ingredients, appliances, ustensils) {
    console.log(appliances);
    const div = document.getElementById("green-content");
    document.querySelectorAll(".appareil").forEach((app) => {
      if (!appliances.includes(app.textContent)) {
        app.style.display = "none";
      }
      if (appliances.includes(app.textContent)) {
        app.style.display = "flex";
      }
    });
    this.updateDropdownSize(div, ingredients, appliances, ustensils);
  }

  /**
   * @return {void}
   */
  updateUstensil(ingredients, appliances, ustensils) {
    const div = document.getElementById("red-content");
    document.querySelectorAll(".ustensil").forEach((ust) => {
      if (!ustensils.includes(ust.textContent)) {
        ust.style.display = "none";
      }
      if (ustensils.includes(ust.textContent)) {
        ust.style.display = "flex";
      }
    });
    this.updateDropdownSize(div, ingredients, appliances, ustensils);
  }

  /**
   *
   * @param dropdown {HTMLElement}
   * @param ingredients
   * @param appliances
   * @param ustensils
   * @return {void}
   */
  updateDropdownSize(dropdown, ingredients, appliances, ustensils) {
    if (dropdown.parentElement.className.includes("opened")) {
      const width = getDropdownWidth(
        dropdown.id,
        ingredients,
        appliances,
        ustensils
      );
      const maxHeight = getDropdownMaxheight(
        dropdown.id,
        ingredients,
        appliances,
        ustensils
      );
      dropdown.style.width = width + "em";
      dropdown.parentElement.children[1].style.width =
        width > 20 ? width - 7.64 + "em" : "auto";
      dropdown.style.maxHeight = maxHeight + "em";
    }
  }
}
