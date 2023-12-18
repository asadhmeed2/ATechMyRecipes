const recipesModel = new RecipesModel();
const rendererModel = new RendererModal();

const input = $('#ingredient-name-ipt');
const recipesContainer =  $('.resipes-container');

const searchRicepes = async ()=>{
    const ingredient = input.val();

    if(!ingredient){
        return;
    }

    // const recipes = [];
    const recipes = await recipesModel.getRecipesFromApi(ingredient,{a:'b'});
    
    rendererModel.render(recipes);

   recipesContainer.on('click','.ricepe-img' ,function(e){
        console.log($(this).closest(".recipe-card").find('.title-link').html());
    })
}
