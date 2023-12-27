class RecipesModel{
    #resipes
    #filter
    #isMaxPage
    constructor(){
        this.#resipes = [];
        this.#filter={sensitivities:[],page: FIRST_PAGE};
        this.#isMaxPage= false;
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

    get isMaxPage(){
        return this.#isMaxPage
    }

    set isMaxPage(value){
        this.#isMaxPage = value
    }

    get isFirstPage(){
        return this.#filter.page === FIRST_PAGE
    }

    async getRecipesFromApi(ingrdient,filter){
        try{

            const { resipes,isMaxPage } = await $.ajax({url:`${RECIPES_ENDPOINT}/${ingrdient}`,data : filter})

            this.#resipes = resipes;

            this.#isMaxPage = isMaxPage;

            return resipes;

        }catch(e){
            console.error("🚀 ~ file: resibes.js:13 ~ Recipes ~ getResibes ~ e:", e)
            return []
        }
    }




}