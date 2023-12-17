const express = require('express')
const router = express.Router()

const axios = require('axios')

const {RICEPE_BY_INGRDIENT_API_URL} = require('../config/config')


router.get('/ricepes/:ingrdient',async (req, res) =>{
    const ingrdient = req.params.ingrdient;
    const filter = req.query;
    
    try{

        const ricepes = await axios.get(`${RICEPE_BY_INGRDIENT_API_URL}/${ingrdient}`);

        //TODO: filter the ricepes 

        if(ricepes.data.results){
            return res.status(200).json({ricepes:ricepes.data.results})
        }
        return res.status(404).json({ricepes:[]})

    }catch(err){
        return res.status(500).json({message:err.message})
    }
})



module.exports = router