import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stage';
import 'regenerator-runtime/runtime';
// console.log(icons);

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;

    recipeView.renderSpinner();

    // 1. Load Recipe
    await model.loadRecipe(id);

    // 2. Rendering Recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    alert(err);
  }
};

// controlRecipes();

// Show a recipe with a hash change or in the load
// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);

// This is the same as the previuos method, but instead of calling twice to window.addEventListener we created an array and loop over it
['hashchange', 'load'].forEach(event =>
  window.addEventListener(event, controlRecipes)
);
