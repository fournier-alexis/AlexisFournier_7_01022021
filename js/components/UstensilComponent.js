export default class UstensilComponent {
  /**
   * Create a recipe DOM component
   * @param ustensil {Ustensil}
   */
  constructor(ustensil) {
    this.ustensil = ustensil;
  }

  /**
   * @returns {HTMLElement}
   */
  createElement() {
    const div = document.createElement("div");
    div.className = "ustensil";
    div.textContent = this.ustensil.name;

    return div;
  }
}
