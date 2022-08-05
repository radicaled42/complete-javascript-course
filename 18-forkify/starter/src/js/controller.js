import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';

import 'core-js/stage';
import 'regenerator-runtime/runtime';

// if (module.hot) {
//   module.hot.accept();
// }

///////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);

    if (!id) return;

    recipeView.renderSpinner();

    // 0) Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);

    // 1. Load Recipe
    await model.loadRecipe(id);

    // 2. Rendering Recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(`controlRecipes - ${err}`);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    //1. Get Search Query
    const query = searchView.getQuery();
    if (!query) return;

    //2. Load search results
    await model.loadSearchResults(query);

    //3. Render results
    // console.log(model.state.search.results);
    // All results
    // resultsView.render(model.state.search.results);
    // Paged results
    resultsView.render(model.getSearchResultsPage());

    //4. Render pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(`controlSearchResults - ${err}`);
  }
};

const controlPagination = function (goToPage) {
  // console.log('Pag Controller');
  // console.log(`${goToPage}`);

  // 1. Render NEW results
  resultsView.render(model.getSearchResultsPage(goToPage));

  //2. Render NEW pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings);

  // Update the view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // 1. Add or remove a bookmark
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }

  // 2. Update recipe view
  // console.log(model.state.recipe);
  recipeView.update(model.state.recipe);

  // 3. Render a bookmark
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerPagination(controlPagination);
};

init();
