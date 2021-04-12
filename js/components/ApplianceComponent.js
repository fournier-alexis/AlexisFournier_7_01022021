export default class ApplianceComponent {
  /**
   * Create a recipe DOM component
   * @param appliance {String}
   */
  constructor(appliance) {
    this.appliance = appliance;
  }

  /**
   * @returns {HTMLElement}
   */
  createElement() {
    const div = document.createElement("div");
    div.className = "appareil";
    div.textContent = this.appliance;

    return div;
  }
}
