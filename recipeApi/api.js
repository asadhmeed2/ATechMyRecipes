const express = require('express')
const router = express.Router()

const axios = require('axios')

const {RICEPE_BY_INGRDIENT_API_URL} = require('../config/config')


router.get('/ricepes/:ingrdient',async (req, res) =>{
    const ingrdient = req.params.ingrdient;
    const filter = req.query;

    try{

        const ricepes = await axios.get(`${RICEPE_BY_INGRDIENT_API_URL}/${ingrdient}`);

        if(ricepes.data.results){
            const mappedRicepes = mapRicepes(ricepes.data.results)
            //TODO : filter the ricepes
            return res.status(axios.HttpStatusCode.Ok).json({resipes:mappedRicepes})
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

const filterRicepes =  (ricepes)=>{
   const filteredRicepes = ricepes.filter((ricepe)=>{
    return true;
   })
   return filteredRicepes
}


module.exports = router