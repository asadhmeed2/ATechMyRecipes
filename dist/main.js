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
    
    rendererModel.render(recipes,filter);
    
    recipesContainer.on('click','.ricepe-img' ,function(e){
        const firstIngredient = $(this).closest(".recipe-card").find('.ing-list').find('.ing-item').html()
        alert(firstIngredient)
    })
}

ingInput.val('cream')

searchRicepes()

const onCheckboxClicked = (e)=>{
    const sensitivities = recipesModel.filter.sensitivities
    const idx = sensitivities.findIndex(sinsitive => sinsitive === e.target.id);
    let tempSensitivities = sensitivities 

    if(idx !== -1){
        tempSensitivities.splice(idx,1);
    }else{
        tempSensitivities.push(e.target.id)
    }

    recipesModel.filter = {...recipesModel.filter,sensitivities:tempSensitivities}
}

const onInputChange = (e)=>{
    const filter = recipesModel.filter
    recipesModel.filter = {...filter,[e.target.name]:e.target.value}
}
