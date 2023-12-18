class RecipesModel{
    #resipes
    #filter
    constructor(){
        this.#resipes = [];
        this.#filter={};
    }

    get recipes(){
        return this.#resipes
    }

    get filter(){
        return this.#filter
    }

    set filter(value){
        this.#filter = value
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