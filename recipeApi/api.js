const express = require('express')
const router = express.Router()

const axios = require('axios')

const recipeModal = require('../models/recipeModal')

const {
    RICEPE_BY_INGRDIENT_API_URL,
} = require('../config/config')


router.get('/:ingrdient',async (req, res) =>{
    const ingrdient = req.params.ingrdient;
    const filter = req.query;

    try{

        const ricepes = await axios.get(`${RICEPE_BY_INGRDIENT_API_URL}/${ingrdient}`);

            try{
                recipeModal.checkRecipes(ricepes.data.results)
                const mappedRicepes = recipeModal.mapRicepes(ricepes.data.results)
                const filteredRicepes = recipeModal.filterRicepes(mappedRicepes,filter);
                
                return res.status(axios.HttpStatusCode.Ok).json({resipes:filteredRicepes})
            }catch(e){
                return res.status(axios.HttpStatusCode.NotFound).json({resipes:[], message:e.message})
            }
    }catch(err){
        return res.status(axios.HttpStatusCode.InternalServerError).json({message:err.message})
    }
})


module.exports = router