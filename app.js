// =======================
// Recipe Data
// =======================

const recipes = [
  { id:1, title:"Classic Spaghetti Carbonara", time:25, difficulty:"easy", description:"Creamy Italian pasta dish.", category:"pasta"},
  { id:2, title:"Chicken Tikka Masala", time:45, difficulty:"medium", description:"Spiced tomato chicken curry.", category:"curry"},
  { id:3, title:"Homemade Croissants", time:180, difficulty:"hard", description:"Buttery flaky pastry.", category:"baking"},
  { id:4, title:"Greek Salad", time:15, difficulty:"easy", description:"Fresh veggies with feta.", category:"salad"},
  { id:5, title:"Beef Wellington", time:120, difficulty:"hard", description:"Beef wrapped in puff pastry.", category:"meat"},
  { id:6, title:"Vegetable Stir Fry", time:20, difficulty:"easy", description:"Quick healthy vegetables.", category:"vegetarian"},
  { id:7, title:"Pad Thai", time:30, difficulty:"medium", description:"Thai rice noodles with peanuts.", category:"noodles"},
  { id:8, title:"Margherita Pizza", time:60, difficulty:"medium", description:"Classic cheese basil pizza.", category:"pizza"}
];


// =======================
// DOM Selection
// =======================

const recipeContainer = document.querySelector("#recipe-container");


// =======================
// Create Card
// =======================

const createRecipeCard = (recipe) => `
  <div class="recipe-card" data-id="${recipe.id}">
    <h3>${recipe.title}</h3>

    <div class="recipe-meta">
      <span>⏱️ ${recipe.time} min</span>
      <span class="difficulty ${recipe.difficulty}">
        ${recipe.difficulty}
      </span>
    </div>

    <p>${recipe.description}</p>
  </div>
`;


// =======================
// Render
// =======================

const renderRecipes = (recipesToRender) => {
  recipeContainer.innerHTML =
    recipesToRender.map(createRecipeCard).join('');
};


// =======================
// Initialize
// =======================

// ===============================
// Helper – Active Button Highlight
// ===============================

const setActive = (clickedBtn) => {
    document.querySelectorAll('button').forEach(btn =>
        btn.classList.remove('active')
    );
    clickedBtn.classList.add('active');
};


// ===============================
// Filter Functions (PURE)
// ===============================

const showAll = (e) => {
    renderRecipes(recipes);
    setActive(event.target);
};

const filterEasy = () => {
    const result = recipes.filter(r => r.difficulty === "easy");
    renderRecipes(result);
    setActive(event.target);
};

const filterMedium = () => {
    const result = recipes.filter(r => r.difficulty === "medium");
    renderRecipes(result);
    setActive(event.target);
};

const filterHard = () => {
    const result = recipes.filter(r => r.difficulty === "hard");
    renderRecipes(result);
    setActive(event.target);
};

const filterQuick = () => {
    const result = recipes.filter(r => r.time < 30);
    renderRecipes(result);
    setActive(event.target);
};


// ===============================
// Sort Functions
// ===============================

const sortByName = () => {
    const sorted = [...recipes].sort((a, b) =>
        a.title.localeCompare(b.title)
    );

    renderRecipes(sorted);
    setActive(event.target);
};

const sortByTime = () => {
    const sorted = [...recipes].sort((a, b) =>
        a.time - b.time
    );

    renderRecipes(sorted);
    setActive(event.target);
};

