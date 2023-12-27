const axios = require('axios');
const {GIPHY_GIFS_API,GIPHY_API_KEY} = require('../config/config')
const {GifsError} = require('../customErrors/customError')

class GiphyAPIModel{

    async getGif(topic){
        try{
            const gifs = await axios.get(`${GIPHY_GIFS_API}/search?q=${topic}&api_key=${GIPHY_API_KEY}`);
            return gifs.data.data
        }catch(err){
            throw new GifsError()
        }
    }

}

module.exports = new GiphyAPIModel()