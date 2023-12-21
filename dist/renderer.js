const INIT_OPTION_VALUE_IDX = 0;


class RendererModal {
     #recipesView;
     #areaSelect;
     #categorySelect;
     #recipeHandler;
     #ingHandler;
     #selectOptHandler;
     #ratingStarHandler;
    
    constructor(){
        this.#recipesView = $('.resipes-container');
        this.#areaSelect = $('#area-select');
        this.#categorySelect = $('#category-select');
        this.#recipeHandler = this.#getTemplate('#ricepe-card-template')
        this.#ingHandler = this.#getTemplate('#ing-list-item-template');
        this.#selectOptHandler = this.#getTemplate('#select-option-template');
        this.#ratingStarHandler = this.#getTemplate('#rating-star-template');
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
            this.#renderRatingStars(recipe.rating,recipe.idMeal);
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

    #renderRatingStars(rating,idMeal){
        const fullStarHtml = this.#ratingStarHandler({starIcon:'star'})
        const emptyStarHtml = this.#ratingStarHandler({starIcon:'star_border'})
        const ratingView = this.#recipesView.find(`[data-id=${idMeal}]`).find('.rating')
        ratingView.empty();
        for(let i=1;i<=RECIPE_MAX_RATING ; i++){
            if(rating >= i){
                ratingView.append(fullStarHtml)
            }else{
                ratingView.append(emptyStarHtml)
            }
        }
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