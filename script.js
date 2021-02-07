// search button EventListener
document.getElementById('search').addEventListener('click',function(){
    document.getElementById('foodDetail').style.display = 'none';
    let innerFoodDiv = document.getElementsByClassName('food');
    for (let i = 0; i < innerFoodDiv.length; i++) {
    const newInnerDiv = innerFoodDiv[i];
    newInnerDiv.style.display = 'none';
    }

    let firstLetter = document.getElementById('areaInput').value[0];
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${firstLetter}`)
    .then(res => res.json())
    .then(data => displayDishes(data.meals))
})

// displayDishes function
const displayDishes = foods =>{
    const dishesDiv = document.getElementById('dishes');
        foods.forEach(food => {
            const foodDiv = document.createElement('div');
            foodDiv.className = 'food';
            foodDiv.innerHTML = `
            <img  onclick="displayFoodIngredient('${food.strMeal}')" src="${food.strMealThumb}">
            <h3  onclick="displayFoodIngredient('${food.strMeal}')">${food.strMeal}</h3>
            `
            dishesDiv.appendChild(foodDiv);
        });
};

// displayFoodIngredient function
const displayFoodIngredient = foodName =>{
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`)
    .then(res => res.json())
    .then(data => displayFoodIngredientDetail(data.meals[0]))
}

// displayFoodIngredientDetail function
const displayFoodIngredientDetail = foods =>{
    document.getElementById('foodDetail').style.display = 'block';
    const foodDetail = document.getElementById('foodDetail')
    foodDetail.innerHTML = `
    <img src="${foods.strMealThumb}">
    <h3>${foods.strMeal}</h3>
    
    `
    for (let i = 1; i < 21; i++) {
        let ingredient = 'strIngredient' + i.toString();
        let measure = 'strMeasure' + i.toString();
        if(foods[ingredient]){
            foodDetail.innerHTML += `
            <p>${foods[ingredient]}: ${foods[measure]}</p>
            `
        }
    }
}