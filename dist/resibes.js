class RecipesModel{
    #resibes
    constructor(){
        this.#resibes = [];
    }


    async getResibes(ingrdient,filter){
        try{

            const { resibes } = await $.ajax({url:`${RECIPES_ENDPOINT}/${ingrdient}`,data : filter})

            this.#resibes = resibes;

            return resibes;

        }catch(e){
            console.error("🚀 ~ file: resibes.js:13 ~ Recipes ~ getResibes ~ e:", e)
            return []
        }
    }




}