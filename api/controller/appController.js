import { Sequelize } from 'sequelize';
import { CategoryTable, PriceTable, PropertiesTable } from '../../models/asociation.js';

const home = async (req, res)=>{
    const prices = await PriceTable.findAll();
    const [ houses, apartments ] = await Promise.all([
        PropertiesTable.findAll({
        where: {
            categoryId: 1,
            publicated: true
        },
        order: [['createdAt', 'DESC']],
        limit: 5
        }),
        PropertiesTable.findAll({
            where: {
                categoryId: 6,
                publicated: true
            },
            order: [['createdAt', 'DESC']],
            limit: 5
        })  
    ]);

    return res.render('./home.pug', {
        page: 'Home ',
        categories: req?.categoriesAux,
        prices,
        houses,
        apartments,
        user: req?.user
    });
}

const category = async (req, res)=>{
    const { id:categoryId } = req.params;
    const categoryData = await CategoryTable.findByPk(categoryId);
    
    if(!categoryData){
        return res.redirect('/404');
    }

    const [ categories, properties ] = await await Promise.all([
        CategoryTable.findAll(),
        PropertiesTable.findAll({
            where: { categoryId, publicated: true },
            include: [
                { model: CategoryTable, as: 'category' },
                { model: PriceTable, as: 'price' }
            ]
        })
    ]);

    console.log(properties.length);
    console.log(properties);
    res.render('./properties/publicProperties.pug', {
        categories,
        categoryData,
        properties,
        user: req?.user
    });
}

const notFound = (req, res)=>{
    res.render('./layout/404.pug', {
        categories: req.categoriesAux,
        user: req.user
    });
}

const searchEngine = async (req, res)=>{
    const categoryId = req.query.categoryId,
        searchTerm = req.query.searchTerm;
        
    if(!searchTerm.trim() && !categoryId.trim()){
        return res.redirect('/');
    }
    
    let properties
    
    if(searchTerm.trim() && categoryId.trim()){
        properties = await PropertiesTable.findAll({
            where: {
                categoryId,
                title: {
                    [Sequelize.Op.like] : '%' + searchTerm + '%'
                }
            },
            include: [
                { model: CategoryTable, as: 'category' },
                { model: PriceTable, as: 'price' }
            ] 
        });
    }

    if (!searchTerm.trim() && categoryId.trim()){
        console.log('--------------')
        properties = await PropertiesTable.findAll({
            where: { categoryId, publicated: true },
            include: [
                { model: CategoryTable, as: 'category' },
                { model: PriceTable, as: 'price' }
            ]
        });
    }
    if(searchTerm.trim() && !categoryId.trim()){
        properties = await PropertiesTable.findAll({
            where: {
                title: {
                    [Sequelize.Op.like] : '%' + searchTerm + '%'
                }
            },
            include: [
                { model: CategoryTable, as: 'category' },
                { model: PriceTable, as: 'price' }
            ] 
        });
    }

    
    res.render('./properties/publicProperties.pug', {
        categories: req.categoriesAux,
        properties,
        user: req?.user
    });
}

export {
    home,
    category,
    notFound,
    searchEngine
}