import CategoryTable from "../models/Category.js";

const findCategories = async (req, res, next)=>{
    const categories = await CategoryTable.findAll();
    req.categoriesAux = categories
    next()
}

export default findCategories;
