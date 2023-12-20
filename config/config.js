const SERVER_PORT = 3000


const RICEPE_BY_INGRDIENT_API_URL = 'https://recipes-goodness-elevation.herokuapp.com/recipes/ingredient';


const DAIRY_INGREDIENTS = ["Cream","Cheese","Milk","Butter","Creme","Ricotta","Mozzarella","Custard","Cream Cheese"]
const GLUTEN_INGREDIENTS = ["Flour","Bread","spaghetti","Biscuits","Beer"]

const All = 'All'

const DAIRY_FILTER_PARAM = 'dairy';
const GLUTEN_FILTER_PARAM = 'gluten';

const SENSITIVITIES_MAP = {
    [DAIRY_FILTER_PARAM]:DAIRY_INGREDIENTS,
    [GLUTEN_FILTER_PARAM]:GLUTEN_INGREDIENTS,

}

const FILTER_CATEGORY_PARAM = 'category';
const FILTER_AREA_PARAM = 'area';
module.exports={
    SERVER_PORT,
    RICEPE_BY_INGRDIENT_API_URL,
    DAIRY_INGREDIENTS,
    GLUTEN_INGREDIENTS,
    DAIRY_FILTER_PARAM,
    GLUTEN_FILTER_PARAM,
    FILTER_CATEGORY_PARAM,
    FILTER_AREA_PARAM,
    SENSITIVITIES_MAP,
    All,
}