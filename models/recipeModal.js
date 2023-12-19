const {
    GLUTEN_FILTER_PARAM,
    GLUTEN_INGREDIENTS,
    DAIRY_FILTER_PARAM,
    DAIRY_INGREDIENTS,
    FILTER_CATEGORY_PARAM,
    FILTER_AREA_PARAM
} = require('../config/config')

const {NoRecipesFoundError} = require('../customErrors/customError')

class RecipeModal{

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
            category:strCategory
        }
        return mappedRicepe
        })
        return mappedRicepes
    }

    filterRicepes (recipes,filter){
        
        let filteredRicepes = recipes;

        filteredRicepes =recipes.filter((ricepe)=>{
            const hasGluten = this.#isSomeIngredientsinArray(ricepe.ingredients,GLUTEN_INGREDIENTS,filter[GLUTEN_FILTER_PARAM])

            const hasDairy = this.#isSomeIngredientsinArray(ricepe.ingredients,DAIRY_INGREDIENTS,filter[DAIRY_FILTER_PARAM])
          
        return !(hasGluten || hasDairy) ;
        })

        if(filter[FILTER_CATEGORY_PARAM]){
            filteredRicepes = this.#filter(filteredRicepes,FILTER_CATEGORY_PARAM,filter[FILTER_CATEGORY_PARAM]) 
        }

        if(filter[FILTER_AREA_PARAM]){
            filteredRicepes = this.#filter(filteredRicepes,FILTER_AREA_PARAM,filter[FILTER_AREA_PARAM]) 
        }
    
        return filteredRicepes
    }

    
    #isSomeIngredientsinArray(ingredients,array,filterPropVal){
        return  filterPropVal === "true"? ingredients.some(ing=> array.some(str => ing.toLowerCase().includes(str.toLowerCase()))):false;
    }
    
    #checkEquality(value1,value2){
        if(typeof value1 === "string" && typeof value2 === "string" && value1 !=='' && value2 !==''){
            return value1.toLowerCase() === value2.toLowerCase()
        }
        return true
    }
    
    #filter(array,itemPropName,filterVal){
        return array.filter((item)=>{
            const isInProp = this.#checkEquality(filterVal,item[itemPropName])
            return isInProp ;
            })
    }
}

const recipeModal = new RecipeModal();

module.exports = recipeModal