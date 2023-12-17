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

            return res.status(200).json({ricepes:mappedRicepes})
        }
        return res.status(404).json({ricepes:[]})

    }catch(err){
        return res.status(500).json({message:err.message})
    }
})


const mapRicepes =  (ricepes)=>{
   const mappedRicepes = ricepes.map((ricepe)=>{
    const {idMeal,ingredients, title,thumbnail} =  ricepe
    const mappedRicepe = {
        idMeal,ingredients, title,thumbnail
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