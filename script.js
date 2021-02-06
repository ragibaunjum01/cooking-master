document.getElementById('search').addEventListener('click',function(){
    let innerFoodDiv = document.getElementsByClassName('food');
    for (let i = 0; i < innerFoodDiv.length; i++) {
    const newInnerDiv = innerFoodDiv[i];
    newInnerDiv.style.display = 'none';
    }

    let firstLetter = document.getElementById('areaInput').value[0];
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`)
    .then(res => res.json())
    .then(data => displayDishes(data.meals))
})

const displayDishes = foods =>{
    const dishesDiv = document.getElementById('dishes');
    
    for (let i = 0; i < foods.length; i++) {
        const food = foods[i];
        const foodDiv = document.createElement('div');
        foodDiv.className = 'food';
        foodDiv.innerHTML = `
        <img  onclick="displayFoodIngredient('${food.strMeal}')" src="${food.strMealThumb}">
        <h3  onclick="displayFoodIngredient('${food.strMeal}')">${food.strMeal}</h3>
        `
    dishesDiv.appendChild(foodDiv);    
    }
};

const displayFoodIngredient = foodName =>{
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${foodName}`)
    .then(res => res.json())
    .then(data => displayFoodIngredientDetail(data.meals))
}

const displayFoodIngredientDetail = foods =>{
    const foodDetail = document.getElementById('foodDetail')
    foodDetail.innerHTML = `
    <img src="${foods.strMealThumb}">
    <h3>${foods.strMeal}</h3>
    <p>${foods.strIngredient1}</p>
    `
}