/**Class representing an ingredient */
export default class Ingredient {
  /**
   * Create an ingredient
   * @param ingredient {string}
   * @param quantity {undefined | number}
   * @param unit {undefined | string}
   * @return {Ingredient}
   */
  constructor(ingredient, quantity, unit) {
    this.ingredient = ingredient;
    this.quantity = quantity;
    this.unit = unit;
  }

  toString() {
    const name = this.ingredient ? this.ingredient : "";
    const quantity = this.quantity ? ": " + this.quantity.toString() : "";
    const unit = this.unit ? this.unit : "";
    return name + quantity + " " + unit;
  }
}
