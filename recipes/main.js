import recipes from './recipes.mjs';

function random(num) {
    return Math.floor(Math.random() * num);
}


function getRandomListEntry(list) {
    const listLength = list.length;
    const randomNum = random(listLength);
    return list[randomNum];
}


function recipeTemplate(recipe) {
	return `<img src="${recipe.image}" alt="${recipe.name}">
            <div id="combined">
                <div id="tags">
                    ${tagsTemplate(recipe.tags)}
                </div>
                <div id="title">
                    <p id="name">${recipe.name}</p>
                    ${ratingTemplate(recipe.rating)}
                </div>
        
                <p class="hide">${recipe.description}</p>
            </div>`;
}

function tagsTemplate(tags) {
    return tags.map(tag => `<p>${tag}</p>`).join('');
}

function ratingTemplate(rating) {
	let html = `<span
	class="rating"
	role="img"
	aria-label="Rating: ${rating} out of 5 stars"
>`;
	for (let i = 1; i <= 5; i++) {
		if (i <= rating) {
			html += `<span aria-hidden="true" class="star">⭐</span>`;
		} else {
			html += `<span aria-hidden="true" class="star-empty">☆</span>`;
		}
	}
	html += `</span>`;
	return html;
}

function renderRecipes(recipeList) {
    const outputElement = document.querySelector('.recipeinfo');
    const recipeStrings = recipeList.map(recipe => recipeTemplate(recipe));
    outputElement.innerHTML = recipeStrings.join('');
}

function init() {
    const recipe = getRandomListEntry(recipes)
    renderRecipes([recipe]);
}
init();

function filterRecipes(query) {
    const filtered = recipes.filter(recipe => 
        recipe.name.toLowerCase().includes(query) ||
        recipe.description.toLowerCase().includes(query) ||
        recipe.tags.find(tag => tag.toLowerCase().includes(query)) ||
        (recipe.ingredients && recipe.ingredients.find(ingredient => ingredient.toLowerCase().includes(query)))
    );
    const sorted = filtered.sort((a, b) => a.name.localeCompare(b.name));
    return sorted;
}

function searchHandler(e) {
    e.preventDefault();
    const searchInput = document.querySelector('#query').value.toLowerCase();
    const filteredRecipes = filterRecipes(searchInput);
    renderRecipes(filteredRecipes);
}

document.querySelector('#searchbutton').addEventListener('click', searchHandler);