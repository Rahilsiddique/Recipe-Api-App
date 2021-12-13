const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result')
const container = document.querySelector('.container')
let searchQuery = ''
const APP_ID = '8db146f2'
const APP_KEY = '447f4b2d9f3714133b081089567ac10c'

searchForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    searchQuery = e.target.querySelector('input').value;
    fetchAPI()
})

async function fetchAPI(){
    const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}&to=20`
    const response = await fetch(baseURL)
    const data = await response.json()
    generateHtml(data.hits)
    console.log(data)
}
function generateHtml(results){
    let generatedHTML = ''
    results.map(result =>{
        generatedHTML+= 
        `
        <div class="item">
            <img src="${result.recipe.image}" alt="chill its just a chiken doe">
            <div class="flex-container">
            <h1 class="title">${result.recipe.label}</h1>
            <a href="${result.recipe.url}" target="_blank" class="view-button">view recipe</a>
            </div>
            <p class="item-data">calories : ${result.recipe.calories.toFixed(2)}</p>
            <p class="item-data">Diet lable : ${result.recipe.dietLabels.length>0?result.recipe.dietLabels:'No data found'}</p>
        </div>

        `
    })
    searchResultDiv.innerHTML = generatedHTML
}