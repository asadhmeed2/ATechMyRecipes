const recipesModel = new RecipesModel();
const rendererModel = new RendererModal();

const input = $('#ingredient-name-ipt');
const recipesContainer =  $('.resipes-container');

const searchRicepes = async ()=>{
    const ingredient = input.val();

    
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


const onCheckboxClicked = (e)=>{
    const filter = recipesModel.filter
    recipesModel.filter = {...filter,[e.target.id]:filter[e.target.id]?!filter[e.target.id]:true}
}
