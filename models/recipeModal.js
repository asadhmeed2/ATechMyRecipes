const {
    All,
    SENSITIVITIES_MAP,
    MAX_RICEPES_IN_PAGE
} = require('../config/config')

const { faker } = require('@faker-js/faker');
const gipyApi = require('../giphyAPI/giphyAPI');

const Utils = require('../utils/utils');

const {NoRecipesFoundError} = require('../customErrors/customError')

const GIF_INDEX = 0;
const PAGE_IDX_DEFFERNT = 1;

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

    async mapRicepes(recipes){
        // const gifs = await this.#getRicepeGif(recipes.map(recipe => recipe.title).join(' '));

        const mappedRicepes = recipes.map( (ricepe)=>{
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
    
        let recipesWithGifs =[]
        
        for(let ric of mappedRicepes){
            recipesWithGifs =[...recipesWithGifs,{...ric,gif: (await this.#getRicepeGif(ric.title)).embed_url}]
        } 

        return recipesWithGifs
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

    getPatch(filteredRicepes, page){
        const firstRecipeIdx = (page - PAGE_IDX_DEFFERNT) * MAX_RICEPES_IN_PAGE;
        const lastRecipeIdx = firstRecipeIdx +MAX_RICEPES_IN_PAGE;
        const result = filteredRicepes.filter((_,idx)=> idx >= firstRecipeIdx && idx < lastRecipeIdx)

        return result
    }

    async #getRicepeGif(name){

      const gifs = await gipyApi.getGif(`Food ${name}`);

      return gifs[GIF_INDEX] ?? '';
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