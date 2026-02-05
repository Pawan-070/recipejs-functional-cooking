/* =========================================
   RecipeJS – Part 4 FINAL
   Search + Favorites + Persistence
========================================= */

const RecipeApp = (() => {

    /* ===============================
       DATA (your 8 recipes stay same)
    =============================== */

    const recipes = [

    {
        id: 1,
        title: "Spaghetti Carbonara",
        time: 25,
        difficulty: "easy",
        description: "Creamy Italian pasta with eggs, cheese and pancetta.",
        ingredients: ["Spaghetti", "Eggs", "Parmesan cheese", "Pancetta", "Black pepper"],
        steps: [
            "Boil pasta",
            "Cook pancetta",
            ["Beat eggs", "Add cheese", "Mix together"],
            "Combine with pasta",
            "Serve hot"
        ]
    },

    {
        id: 2,
        title: "Chicken Tikka Masala",
        time: 45,
        difficulty: "medium",
        description: "Tender chicken cooked in a rich tomato cream sauce.",
        ingredients: ["Chicken", "Yogurt", "Tomato puree", "Cream", "Spices"],
        steps: [
            "Marinate chicken",
            [
                "Heat oil",
                "Cook onions",
                ["Add ginger garlic paste", "Add spices", "Cook 2 minutes"]
            ],
            "Add tomato sauce",
            "Simmer chicken",
            "Serve with rice"
        ]
    },

    {
        id: 3,
        title: "Homemade Croissants",
        time: 180,
        difficulty: "hard",
        description: "Flaky buttery French pastries made from laminated dough.",
        ingredients: ["Flour", "Butter", "Milk", "Yeast", "Sugar", "Salt"],
        steps: [
            "Prepare dough",
            [
                "Roll dough",
                "Add butter layer",
                ["Fold dough", "Chill", "Repeat folding 3 times"]
            ],
            "Shape croissants",
            "Bake until golden"
        ]
    },

    {
        id: 4,
        title: "Greek Salad",
        time: 15,
        difficulty: "easy",
        description: "Fresh vegetables tossed with feta and olives.",
        ingredients: ["Tomatoes", "Cucumber", "Olives", "Feta cheese", "Olive oil"],
        steps: [
            "Chop vegetables",
            "Mix in bowl",
            "Add feta and olives",
            "Drizzle olive oil",
            "Serve fresh"
        ]
    },

    {
        id: 5,
        title: "Beef Wellington",
        time: 120,
        difficulty: "hard",
        description: "Tender beef wrapped with mushrooms and puff pastry.",
        ingredients: ["Beef fillet", "Mushrooms", "Puff pastry", "Mustard", "Egg wash"],
        steps: [
            "Sear beef",
            [
                "Prepare mushroom duxelles",
                "Spread on beef",
                ["Wrap with pastry", "Seal edges"]
            ],
            "Bake until golden",
            "Rest and slice"
        ]
    },

    {
        id: 6,
        title: "Vegetable Stir Fry",
        time: 20,
        difficulty: "easy",
        description: "Quick mixed vegetables cooked in savory sauce.",
        ingredients: ["Carrot", "Broccoli", "Capsicum", "Soy sauce", "Garlic"],
        steps: [
            "Chop vegetables",
            "Heat pan",
            "Stir fry vegetables",
            "Add sauce",
            "Serve hot"
        ]
    },

    {
        id: 7,
        title: "Pad Thai",
        time: 30,
        difficulty: "medium",
        description: "Classic Thai rice noodles with peanuts and tamarind.",
        ingredients: ["Rice noodles", "Shrimp", "Eggs", "Peanuts", "Tamarind sauce"],
        steps: [
            "Soak noodles",
            ["Cook shrimp", "Add eggs", "Add noodles"],
            "Add sauce",
            "Toss well",
            "Garnish peanuts"
        ]
    },

    {
        id: 8,
        title: "Margherita Pizza",
        time: 60,
        difficulty: "medium",
        description: "Classic pizza topped with mozzarella, tomato and basil.",
        ingredients: ["Flour", "Yeast", "Tomato sauce", "Mozzarella", "Basil leaves"],
        steps: [
            "Prepare dough",
            "Spread sauce",
            ["Add cheese", "Add basil"],
            "Bake 15 minutes",
            "Slice and serve"
        ]
    }

];

; // keep your existing array


    /* ===============================
       STATE
    =============================== */

    let currentRecipes = [...recipes];
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];


    /* ===============================
       DOM
    =============================== */

    const container = document.querySelector('#recipe-container');
    const searchInput = document.querySelector('#searchInput');
    const counter = document.querySelector('#recipe-count');


    /* ===============================
       SAVE FAVORITES
    =============================== */

    const saveFavorites = () =>
        localStorage.setItem('favorites', JSON.stringify(favorites));


    /* ===============================
       COUNTER
    =============================== */

    const updateCounter = (shown) => {
        counter.textContent =
            `Showing ${shown} of ${recipes.length} recipes`;
    };


    /* ===============================
       RECURSIVE STEPS
    =============================== */

    const renderSteps = (steps) => `
        <ul>
            ${steps.map(step =>
                Array.isArray(step)
                    ? renderSteps(step)
                    : `<li>${step}</li>`
            ).join('')}
        </ul>
    `;


    /* ===============================
       CARD TEMPLATE
    =============================== */

    const createCard = (r) => {

        const isFav = favorites.includes(r.id);

        return `
            <div class="recipe-card" data-id="${r.id}">

                <h3>
                    ${r.title}
                    <span class="favorite ${isFav ? 'active' : ''}">
                        ❤️
                    </span>
                </h3>

                <div class="recipe-meta">
                    <span>⏱️ ${r.time} min</span>
                    <span class="difficulty ${r.difficulty}">
                        ${r.difficulty}
                    </span>
                </div>

                <p>${r.description}</p>

                <div class="card-buttons">
                    <button class="toggle-steps">Steps</button>
                    <button class="toggle-ingredients">Ingredients</button>
                </div>

                <div class="steps hidden">
                    ${renderSteps(r.steps)}
                </div>

                <div class="ingredients hidden">
                    <ul>${r.ingredients.map(i => `<li>${i}</li>`).join('')}</ul>
                </div>

            </div>
        `;
    };


    /* ===============================
       RENDER
    =============================== */

    const renderRecipes = (data) => {
        currentRecipes = data;
        container.innerHTML = data.map(createCard).join('');
        updateCounter(data.length);
    };


    /* ===============================
       SEARCH (Debounced)
    =============================== */

    const debounce = (fn, delay = 300) => {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => fn(...args), delay);
        };
    };

    const handleSearch = debounce((value) => {

        const term = value.toLowerCase();

        const filtered = recipes.filter(r =>
            r.title.toLowerCase().includes(term) ||
            r.ingredients.join(' ').toLowerCase().includes(term)
        );

        renderRecipes(filtered);

    });

    searchInput.addEventListener('input',
        (e) => handleSearch(e.target.value)
    );


    /* ===============================
       FAVORITES
    =============================== */

    const toggleFavorite = (id) => {

        if (favorites.includes(id))
            favorites = favorites.filter(f => f !== id);
        else
            favorites.push(id);

        saveFavorites();
        renderRecipes(currentRecipes);
    };

    const showFavorites = () => {
        const favRecipes = recipes.filter(r =>
            favorites.includes(r.id)
        );
        renderRecipes(favRecipes);
    };


    /* ===============================
       EVENT DELEGATION
    =============================== */

    container.addEventListener('click', (e) => {

        const card = e.target.closest('.recipe-card');
        if (!card) return;

        const id = Number(card.dataset.id);

        if (e.target.classList.contains('favorite'))
            toggleFavorite(id);

        if (e.target.classList.contains('toggle-steps'))
            card.querySelector('.steps').classList.toggle('hidden');

        if (e.target.classList.contains('toggle-ingredients'))
            card.querySelector('.ingredients').classList.toggle('hidden');
    });


    /* ===============================
       FILTERS / SORTS (unchanged)
    =============================== */

    const showAll = () => renderRecipes(recipes);
    const filterEasy = () => renderRecipes(recipes.filter(r => r.difficulty === "easy"));
    const filterMedium = () => renderRecipes(recipes.filter(r => r.difficulty === "medium"));
    const filterHard = () => renderRecipes(recipes.filter(r => r.difficulty === "hard"));
    const filterQuick = () => renderRecipes(recipes.filter(r => r.time < 30));
    const sortByName = () => renderRecipes([...recipes].sort((a,b)=>a.title.localeCompare(b.title)));
    const sortByTime = () => renderRecipes([...recipes].sort((a,b)=>a.time-b.time));


    /* ===============================
       INIT
    =============================== */

    renderRecipes(recipes);


    /* ===============================
       PUBLIC API
    =============================== */

    return {
        showAll,
        filterEasy,
        filterMedium,
        filterHard,
        filterQuick,
        sortByName,
        sortByTime,
        showFavorites
    };

})();
