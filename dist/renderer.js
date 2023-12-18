class RendererModal {
     #recipesView;
     #recipeHandler;
     #ingHandler;
    
    constructor(){
        this.#recipesView = $('.resipes-container');
        this.#recipeHandler = this.#getTemplate('#ricepe-card-template')
        this.#ingHandler = this.#getTemplate('#ing-list-item-template');
    }


    #getTemplate(templetIdSelector){
        const src = $(templetIdSelector).html();
        const handleTemplate = Handlebars.compile(src);
        return handleTemplate
    }

    render(recipes){
        this.#recipesView.empty();
        recipes.forEach(recipe=>{
            const newHtml = this.#recipeHandler(recipe);
            this.#recipesView.append(newHtml);
            this.#renderIngs(recipe.ingredients,recipe.idMeal);
        })
    }

    #renderIngs(ings,idMeal){
        const ingView = this.#recipesView.find(`[data-id=${idMeal}]`).find('.ing-list');
            ingView.empty();
            ings.forEach(ing=>{
                const newHtml = this.#ingHandler({ing})
                ingView.append(newHtml);
            })
    }

}