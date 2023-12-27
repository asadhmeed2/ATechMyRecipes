class NoRecipesFoundError extends Error {
    message = 'No Recipes Found'
}

class GifsError extends Error {
    message = 'Gifs api error'
}

module.exports={
    NoRecipesFoundError,
    GifsError
}