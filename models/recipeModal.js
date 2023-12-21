const {
    All,
    SENSITIVITIES_MAP
} = require('../config/config')

const { faker } = require('@faker-js/faker');
const Utils = require('../utils/utils');

const {NoRecipesFoundError} = require('../customErrors/customError')

class RecipeModal{
    #ing2Recipes
    constructor(){
        this.#ing2Recipes={}
    }

    get ing2Recipes(){
        return this.#ing2Recipes
    }

    set ing2Recipes({ingrdient,recipes}){
        this.#ing2Recipes[ingrdient] = recipes;
    }

    checkRecipes(recipes){
        if(!recipes){
            throw new NoRecipesFoundError()
        }
    }

    mapRicepes(recipes){
        const mappedRicepes = recipes.map((ricepe)=>{
        const {idMeal,ingredients, title,thumbnail,href,strArea,strCategory} =  ricepe
        const mappedRicepe = {
            idMeal,
            ingredients,
            title,
            thumbnail,
            href,
            area:strArea,
            category:strCategory,
            chef: faker.person.fullName(),
            rating: Utils.getRandomNumber(5)
        }
        return mappedRicepe
        })
        return mappedRicepes
    }

    filterRicepes (recipes,filter){
        
        let filteredRicepes = recipes;
        const {sensitivities,...restFilter} = filter;

        filteredRicepes =recipes.filter((recipe)=>this.#filterViaSensitivities(recipe,sensitivities))

        if(restFilter){
            for(let prop of Object.keys(restFilter)){
                filteredRicepes = this.#filterByRecipeProperty(filteredRicepes, prop, filter[prop]) 
            }
        }
        return filteredRicepes
    }

    #filterViaSensitivities(recipe,sensitivities){
            for(let sensitivity of sensitivities || []){
                return !this.#isIngredientsinSensitivetyArray(recipe.ingredients,SENSITIVITIES_MAP[sensitivity])
            }
            return true;
    }

    
    #isIngredientsinSensitivetyArray(ingredients,array){
        return ingredients.some(ing=> array.includes(ing));
    }
    
    #checkEquality(value1,value2){
        if(typeof value1 === "string" && typeof value2 === "string" && value1 !=='' && value2 !==''){
            return value1.toLowerCase() === value2.toLowerCase()
        }
        return true
    }
    
    #filterByRecipeProperty(recipes,itemPropName,filterVal){
        if(filterVal === All){
            return recipes
        }
        return recipes.filter((item)=>{
            const isInProp = this.#checkEquality(filterVal,item[itemPropName])
            return isInProp ;
            })
    }
}

const recipeModal = new RecipeModal();

module.exports = recipeModal