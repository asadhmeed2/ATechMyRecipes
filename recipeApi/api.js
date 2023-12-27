const express = require('express')
const router = express.Router()

const axios = require('axios')

const recipeModal = require('../models/recipeModal')

const {
    RICEPE_BY_INGRDIENT_API_URL,
    MAX_RICEPES_IN_PAGE,
} = require('../config/config')


router.get('/:ingrdient',async (req, res) =>{
    const ingrdient = req.params.ingrdient;
    const filter = req.query;
    const ing2Recipes = recipeModal.ing2Recipes

    try{
        let recipes = [];
        if(ing2Recipes[ingrdient]){
            recipes = ing2Recipes[ingrdient]
        }else{
            const recipesApiData = await axios.get(`${RICEPE_BY_INGRDIENT_API_URL}/${ingrdient}`);
            recipes = recipesApiData.data.results;
            recipeModal.ing2Recipes = {ingrdient,recipes}
        }

            try{
                recipeModal.checkRecipes(recipes)
                const mappedRicepes = await recipeModal.mapRicepes(recipes)
                const filteredRicepes = recipeModal.filterRicepes(mappedRicepes,filter);

                const ricepePatch = recipeModal.getPatch(filteredRicepes,+filter.page);

                const isMaxPage = filter.page * MAX_RICEPES_IN_PAGE > filteredRicepes.length-1;
                
                return res.status(axios.HttpStatusCode.Ok).json({resipes:ricepePatch,isMaxPage})
            }catch(e){
                return res.status(axios.HttpStatusCode.NotFound).json({resipes:[], message:e.message})
            }
    }catch(err){
        return res.status(axios.HttpStatusCode.InternalServerError).json({message:err.message})
    }
})


module.exports = router