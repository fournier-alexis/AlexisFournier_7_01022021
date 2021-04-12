import Tag from "../metier/Tag";
import {
  getDropdownMaxheight,
  getDropdownWidth,
  isDropdownContent,
  isOpen,
} from "../utils/Utils";
import IngredientComponent from "../components/IngredientComponent";
import ApplianceComponent from "../components/ApplianceComponent";
import UstensilComponent from "../components/UstensilComponent";
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
      this.controller.currentRecipes = this.controller.sortByTags();
      this.controller.updateRecipes();
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
      this.updateDropdownSize(dropdown);
    } else {
      dropdown.parentElement.classList.remove("opened");
      dropdown.parentElement.children[1].style.width = "auto";
    }
  }

  /**
   * @return {void}
   */
  updateDropdownValues() {
    this.controller.currentIngredients = getAllIngredients(
      this.controller.currentRecipes
    );
    this.controller.currentAppliances = getAllAppliance(
      this.controller.currentRecipes
    );
    this.controller.currentUstensils = getAllUstensil(
      this.controller.currentRecipes
    );
    this.updateDropdowns();
  }

  /**
   * @return {void}
   */
  updateDropdowns() {
    this.updateIngredients();
    this.updateAppliance();
    this.updateUstensil();
  }

  /**
   * @return {void}
   */
  updateIngredients() {
    const div = document.getElementById("blue-content");
    div.innerHTML = "";
    this.controller.currentIngredients.forEach((ingredient) => {
      div.appendChild(new IngredientComponent(ingredient).createElement());
    });
    this.updateDropdownSize(div);
  }

  /**
   * @return {void}
   */
  updateAppliance() {
    const div = document.getElementById("green-content");
    div.innerHTML = "";
    this.controller.currentAppliances.forEach((appliance) => {
      div.appendChild(new ApplianceComponent(appliance).createElement());
    });
    this.updateDropdownSize(div);
  }

  /**
   * @return {void}
   */
  updateUstensil() {
    const div = document.getElementById("red-content");
    div.innerHTML = "";
    this.controller.currentUstensils.forEach((ustensil) => {
      div.appendChild(new UstensilComponent(ustensil).createElement());
    });
    this.updateDropdownSize(div);
  }

  /**
   *
   * @param dropdown {HTMLElement}
   * @return {void}
   */
  updateDropdownSize(dropdown) {
    if (dropdown.parentElement.className.includes("opened")) {
      const width = getDropdownWidth(
        dropdown.id,
        this.controller.currentIngredients,
        this.controller.currentAppliances,
        this.controller.currentUstensils
      );
      const maxHeight = getDropdownMaxheight(
        dropdown.id,
        this.controller.currentIngredients,
        this.controller.currentAppliances,
        this.controller.currentUstensils
      );
      dropdown.style.width = width + "em";
      dropdown.parentElement.children[1].style.width =
        width > 20 ? width - 7.64 + "em" : "auto";
      dropdown.style.maxHeight = maxHeight + "em";
    }
  }
}
