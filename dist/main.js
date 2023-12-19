const recipesModel = new RecipesModel();
const rendererModel = new RendererModal();

const ingInput = $('#ingredient-name-ipt');
const recipesContainer =  $('.resipes-container');



const searchRicepes = async ()=>{
    const ingredient = ingInput.val();
    
    if(!ingredient){
        return;
    }
    
    const filter = recipesModel.filter;
    
    // const recipes = [];
    const recipes = await recipesModel.getRecipesFromApi(ingredient,filter);
    
    rendererModel.render(recipes);
    
    recipesContainer.on('click','.ricepe-img' ,function(e){
        const firstIngredient = $(this).closest(".recipe-card").find('.ing-list').find('.ing-item').html()
        alert(firstIngredient)
    })
}

ingInput.val('cream')

searchRicepes()

const onCheckboxClicked = (e)=>{
    const filter = recipesModel.filter
    recipesModel.filter = {...filter,[e.target.id]:filter[e.target.id]?!filter[e.target.id]:true}
}

const onInputChange = (e)=>{
    const filter = recipesModel.filter
    recipesModel.filter = {...filter,[e.target.name]:e.target.value}
}
