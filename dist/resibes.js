class RecipesModel{
    #resipes
    constructor(){
        this.#resipes = [];
    }

    get recipes(){
        return this.#resipes
    }

    async getRecipesFromApi(ingrdient,filter){
        try{

            const { resipes } = await $.ajax({url:`${RECIPES_ENDPOINT}/${ingrdient}`,data : filter})

            this.#resipes = resipes;

            return resipes;

        }catch(e){
            console.error("🚀 ~ file: resibes.js:13 ~ Recipes ~ getResibes ~ e:", e)
            return []
        }
    }




}