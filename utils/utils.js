class Utils{
    static getRandomNumber(upTo = 1 ){
        if(isNaN(upTo)){
            throw new Error("getRandomNumber first argument must be a number")
        }

        const randNum = Math.floor( Math.random() * upTo);
        return randNum
    }
}

module.exports = Utils 