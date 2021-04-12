import DaoRecipe from "./modele/DaoRecipe";
import { recipes } from "../src/recipes";
import Controller from "./controller/Controller";
import RecipeComponent from "./components/RecipeComponent";
import IngredientComponent from "./components/IngredientComponent";
import UstensilComponent from "./components/UstensilComponent";
import ApplianceComponent from "./components/ApplianceComponent";

//Create all recipes as object
new DaoRecipe(recipes).createRecipes();
Controller.listRecipe.forEach((recipe) => {
  document
    .getElementById("cards")
    .appendChild(new RecipeComponent(recipe).createElement());
});
Controller.listIngredients.forEach((ingredient) => {
  document
    .getElementById("blue-content")
    .appendChild(new IngredientComponent(ingredient).createElement());
});

Controller.listAppliance.forEach((appliance) => {
  document
    .getElementById("green-content")
    .appendChild(new ApplianceComponent(appliance).createElement());
});

Controller.listUstensils.forEach((ustensil) => {
  document
    .getElementById("red-content")
    .appendChild(new UstensilComponent(ustensil).createElement());
});

new Controller();
