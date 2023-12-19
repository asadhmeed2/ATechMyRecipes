const INIT_OPTION_VALUE_IDX = 0;

class RendererModal {
     #recipesView;
     #areaSelect;
     #categorySelect;
     #recipeHandler;
     #ingHandler;
     #selectOptHandler;
    
    constructor(){
        this.#recipesView = $('.resipes-container');
        this.#areaSelect = $('#area-select');
        this.#categorySelect = $('#category-select');
        this.#recipeHandler = this.#getTemplate('#ricepe-card-template')
        this.#ingHandler = this.#getTemplate('#ing-list-item-template');
        this.#selectOptHandler = this.#getTemplate('#select-option-template');
    }


    #getTemplate(templetIdSelector){
        const src = $(templetIdSelector).html();
        const handleTemplate = Handlebars.compile(src);
        return handleTemplate
    }

    render(recipes,filter){
        this.#recipesView.empty();
        recipes.forEach(recipe=>{
            const newHtml = this.#recipeHandler(recipe);
            this.#recipesView.append(newHtml);
            this.#renderIngs(recipe.ingredients,recipe.idMeal);
        })

        this.#renderSelectOptions(this.#areaSelect,AREA_NAMES,this.#selectOptHandler,filter.area)
        this.#renderSelectOptions(this.#categorySelect,CATEGORY_NAMES,this.#selectOptHandler,filter.category)
    }

    #renderIngs(ings,idMeal){
        const ingView = this.#recipesView.find(`[data-id=${idMeal}]`).find('.ing-list');
            ingView.empty();
            ings.forEach(ing=>{
                const newHtml = this.#ingHandler({ing})
                ingView.append(newHtml);
            })
    }

    #renderSelectOptions(selectElement , options,handler,initValue){
        selectElement.empty();
        options.forEach(name=>{
            const newHtml = handler({name});
            selectElement.append(newHtml)
        })

        selectElement.val(initValue?initValue:options[INIT_OPTION_VALUE_IDX])
    }

}