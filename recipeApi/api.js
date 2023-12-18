const express = require('express')
const router = express.Router()

const axios = require('axios')

const {RICEPE_BY_INGRDIENT_API_URL, GLUTEN_FILTER_PARAM, GLUTEN_INGREDIENTS, DAIRY_FILTER_PARAM, DAIRY_INGREDIENTS} = require('../config/config')


router.get('/ricepes/:ingrdient',async (req, res) =>{
    const ingrdient = req.params.ingrdient;
    const filter = req.query;

    try{

        const ricepes = await axios.get(`${RICEPE_BY_INGRDIENT_API_URL}/${ingrdient}`);

        if(ricepes.data.results){
            const mappedRicepes = mapRicepes(ricepes.data.results)
            const filteredRicepes = filterRicepes(mappedRicepes,filter);

            return res.status(axios.HttpStatusCode.Ok).json({resipes:filteredRicepes})
        }
        return res.status(axios.HttpStatusCode.NotFound).json({resipes:[]})

    }catch(err){
        return res.status(axios.HttpStatusCode.InternalServerError).json({message:err.message})
    }
})


const mapRicepes =  (recipes)=>{
   const mappedRicepes = recipes.map((ricepe)=>{
    const {idMeal,ingredients, title,thumbnail,href} =  ricepe
    const mappedRicepe = {
        idMeal,
        ingredients,
        title,
        thumbnail,
        href
    }
    return mappedRicepe
   })
   return mappedRicepes
}

const isSomeIngredientsinArray = (ingredients,array,filterPropVal)=>{
    return  filterPropVal === "true"? ingredients.some(ing=> array.some(str => ing.toLowerCase().includes(str.toLowerCase()))):false;
}


const filterRicepes =  (ricepes,filter)=>{
   const filteredRicepes = ricepes.filter((ricepe)=>{
    const hasGluten =isSomeIngredientsinArray(ricepe.ingredients,GLUTEN_INGREDIENTS,filter[GLUTEN_FILTER_PARAM])

    const hasDairy =isSomeIngredientsinArray(ricepe.ingredients,DAIRY_INGREDIENTS,filter[DAIRY_FILTER_PARAM])

    return !(hasGluten || hasDairy);
   })
   return filteredRicepes
}


module.exports = router