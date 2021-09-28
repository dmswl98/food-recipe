const searchBtn = document.getElementById('search-btn');
const resultTitle = document.querySelector('.result-title');
const resultVal = document.querySelector('.result');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');
const overlay = document.querySelector('.overlay');

const chk = document.getElementById('chk');
const body = document.body;
const title = document.querySelector('.title');
const mealDetails = document.querySelector('.meal-details');
const label = document.querySelector('.label');
const ball = document.querySelector('.ball');

chk.addEventListener('change', () => {
    body.classList.toggle('dark');
    title.classList.toggle('dark');
    mealDetails.classList.toggle('dark');
    label.classList.toggle('dark');
    ball.classList.toggle('dark');
});


const scrollBtn = document.querySelector('.scroll-btn');

scrollBtn.addEventListener('click', (e) => {
    e.preventDefault;
    window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth"
    });
});


//로드되었을 때 모든 메뉴 보이기
window.onload = function () {
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=`)
        .then(response => response.json())
        .then(data => {
            let item = "";
            if (data.meals) {
                data.meals.forEach(meal => {
                    item += `
                        <div class="meal-item" data-id="${meal.idMeal}">
                            <div class="meal-img">
                                <img src="${meal.strMealThumb}" alt="food">
                            </div>
                            <div class="meal-name">
                                <h3>${meal.strMeal}</h3>
                                <a href="#" class="recipe-btn">Get Recipe</a>
                            </div>
                        </div>
                    `;
                });
                mealList.classList.remove('notFound');
            } else {
                item = "Sorry, we didn't find any meal!"; 
                mealList.classList.add('notFound');
            }
            mealList.innerHTML = item;
        });
}

// event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('show');
    overlay.classList.remove('is-active');
});

// get meal list that matches with the ingredients
function getMealList() {
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
        .then(response => response.json())
        .then(data => {
            let item = "";
            if (data.meals) {
                data.meals.forEach(meal => {
                    item += `
                        <div class="meal-item" data-id="${meal.idMeal}">
                            <div class="meal-img">
                                <img src="${meal.strMealThumb}" alt="food">
                            </div>
                            <div class="meal-name">
                                <h3>${meal.strMeal}</h3>
                                <a href="#" class="recipe-btn">Get Recipe</a>
                            </div>
                        </div>
                    `;
                });
                mealList.classList.remove('notFound');
                resultTitle.classList.add('show');
                resultVal.innerText = `"` + searchInputTxt + `"`;
            } else {
                resultTitle.classList.remove('show');
                item = "Sorry, we didn't find any meal!"; 
                mealList.classList.add('notFound');
                resultVal.innerText = "";
            }
            mealList.innerHTML = item;
        });
}

// get recipe of the meal
function getMealRecipe(e) {
    e.preventDefault();
    if (e.target.classList.contains('recipe-btn')) {
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
            .then(response => response.json())
            .then(data => mealRecipeModel(data.meals));
    }
}

function mealRecipeModel(meal) {
    meal = meal[0];
    let item = `
        <h2 class="recipe-title">${meal.strMeal}</h2>
        <p class="recipe-category">${meal.strCategory}</p>
        <div class="recipe-meal-img">
            <img src="${meal.strMealThumb}" alt="">
        </div>
        <div class="recipe-link">
            <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
        </div>
        <div class="recipe-instruct">
            <h3>Instructions</h3>
            <p>${meal.strInstructions}</p>
        </div>    
    `;
    mealDetailsContent.innerHTML = item;
    mealDetailsContent.parentElement.classList.add('show');

    overlay.classList.add('is-active');
}