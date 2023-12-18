const SERVER_PORT = 3000


const RICEPE_BY_INGRDIENT_API_URL = 'https://recipes-goodness-elevation.herokuapp.com/recipes/ingredient';


const DAIRY_INGREDIENTS = ["Cream","Cheese","Milk","Butter","Creme","Ricotta","Mozzarella","Custard","Cream Cheese"]
const GLUTEN_INGREDIENTS = ["Flour","Bread","spaghetti","Biscuits","Beer"]

const DAIRY_FILTER_PARAM = 'dairy';
const GLUTEN_FILTER_PARAM = 'gluten';

module.exports={
    SERVER_PORT,
    RICEPE_BY_INGRDIENT_API_URL,
    DAIRY_INGREDIENTS,
    GLUTEN_INGREDIENTS,
    DAIRY_FILTER_PARAM,
    GLUTEN_FILTER_PARAM
}