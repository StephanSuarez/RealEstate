import { validationResult } from "express-validator";
import { CategoryTable, PriceTable, PropertiesTable, MessageTable, User } from '../../models/asociation.js';
import { unlink } from 'node:fs/promises';
import { isSeller } from "../../helpers/index.js";


const myProperties = async (req, res)=>{
    const { pag: currentPag } = req.query;
    const expression = /^[1-9]$/
    
    if(!expression.test(currentPag)){
        return res.redirect('/properties?pag=1')
    }
    try {
        const { id } = req.user;
        const limit = 4;
        const offset = ((currentPag * limit) - limit );

        const [ properties, total ] = await Promise.all([
            PropertiesTable.findAll( {
                limit, 
                offset,
                where: {
                    userId: id
                },
                include: [
                    {model: CategoryTable, as: 'category'},
                    {model: PriceTable, as: 'price'},
                    {model: MessageTable, as: 'messages'}
                ]
            }),
            PropertiesTable.count({
                where: { userId: id }
            })
        ]);
        // let total = 100;
        return res.render('./properties/properties.pug', {
            page: 'My Properties',
            properties,
            totalProperties: Math.ceil(total/limit),
            currentPag,
            categories: req?.categoriesAux,
            user: req?.user
        })
    } catch (error) {
        console.log(error);
    }

}

const createProperties = async (req, res)=>{
    // Getting data about categories and prices
    const [categories, prices] = await Promise.all([
        CategoryTable.findAll(),
        PriceTable.findAll()
    ]);
    
    return res.render('./properties/createProperties.pug', {
        page: 'Create Propertie',
        categories,
        prices,
        user: req.user,
        data: {}
    })
}

const saveProperty = async (req, res)=>{
    let result = validationResult(req);
    
    if(!result.isEmpty()){

        const [categories, prices] = await Promise.all([
            CategoryTable.findAll(),
            PriceTable.findAll()
        ]);

        return res.render('./properties/createProperties.pug', {
            page: 'My Properties',
            showNav: true,
            categories,
            prices,
            errors: result.array(),
            data: req.body
        })
    }

    const { title, description, rooms, parking, bathrooms, addressData:street, latData:latitude, lngData:longitude, price:priceId, category:categoryId } = req.body;
    const { id:userId } = req.user;

    try {
        const savedProperty = await PropertiesTable.create({
            title,
            description,
            rooms,
            parking,
            bathrooms,
            street,
            latitude,
            longitude,
            priceId,
            categoryId,
            userId,
            image: ''
        });

        const { id } = savedProperty;
        return res.redirect(`/properties/addImage/${id}`);
    } catch (error) {
        console.log(error);
    }
}

const addImage = async (req, res)=>{

    const { id:idProperty } = req.params;

    const property = await PropertiesTable.findByPk(idProperty); 
    const { userId, publicated } = property;

    // validate if id exist
    if(!property){
        return res.redirect('/properties');
    }

    // validadte if property is not published
    if(publicated){
        return res.redirect('/properties');
    }

    // validate if id property owns user by jwt

    const { id:userIdJwt } = req.user; 
    if(userId.toString() !== userIdJwt.toString() ){
        return res.redirect('/properties');
    }

    return res.render('./properties/addimage.pug', {
        page: 'Add and Image',
        idProperty: idProperty,
        categories: req.categoriesAux,
        user: req.user
    })
}

const saveImage = async (req, res, next)=>{
    try {
        const { id:idProperty } = req.params;

        var property = await PropertiesTable.findByPk(idProperty); 
        var { userId, publicated } = property;
    } catch (error) {
        return res.redirect('properties');
    }

    // validate if id exist
    if(!property){
        return res.redirect('/properties');
    }
    // if(userId == req.user)
    // validadte if property is not published
    if(publicated){
        return res.redirect('/properties');
    }

    // validate if id property owns user by jwt

    const { id:userIdJwt } = req.user; 
    if(userId.toString() !== userIdJwt.toString() ){
        return res.redirect('/properties');
    }

    try {
        property.image = req.file.filename;
        property.publicated = 1;

        await property.save();
        next();

    } catch (error) {
        console.log(error);
    }
}

const editProperty = async (req,res)=>{
    const { id:idProperty } = req.params;

    const property = await PropertiesTable.findByPk(idProperty); 
    const { userId, publicated } = property;

    const [categories, prices] = await Promise.all([
        CategoryTable.findAll(),
        PriceTable.findAll()
    ]);

    // validate if id exist
    if(!property){
        return res.redirect('/properties');
    }

    // validadte if property is not published
    if(!publicated){
        return res.redirect('/properties'); 
    }

    // validate if id property owns user by jwt
    const { id:userIdJwt } = req.user; 
    if(userId.toString() !== userIdJwt.toString() ){
        return res.redirect('/properties');
    }

    return res.render('./properties/edit.pug', {
        page: `Edit Property: ${property.title}`,
        categories,
        prices,
        data: property,
        user: req.user
    })
}

const updateProperty = async (req, res)=>{
    let result = validationResult(req);
    
    if(!result.isEmpty()){

        const [categories, prices] = await Promise.all([
            CategoryTable.findAll(),
            PriceTable.findAll()
        ]);

        return res.render('./properties/edit.pug', {
            page: 'Edit Property',
            categories,
            prices,
            errors: result.array(),
            data: req.body
        })
    }

    const { id:idProperty } = req.params;

    const property = await PropertiesTable.findByPk(idProperty); 

    const { title, description, rooms, parking, bathrooms, addressData:street, latData:latitude, lngData:longitude, price:priceId, category:categoryId } = req.body;

    try {
        property.set({
            title,
            description,
            rooms,
            parking,
            bathrooms,
            street,
            latitude,
            longitude,
            priceId,
            categoryId,
        })

        await property.save();

        return res.redirect('/properties');
    } catch (error) {
        console.log(error);
    }
}

const deleteProperty = async (req, res)=>{
    
    const { id:idProperty } = req.params;

    const property = await PropertiesTable.findByPk(idProperty); 
    const { userId, publicated } = property;

    if(!property){
        return res.redirect('/properties');
    }

    // validadte if property is not published
    if(!publicated){
        return res.redirect('/properties'); 
    }

    const { id:userIdJwt } = req.user; 
    if(userId.toString() !== userIdJwt.toString() ){
        return res.redirect('/properties');
    }

    try {
        // const imagePath = path.join(__dirname, 'public', 'uploads', property.image);
        // await unlink(imagePath);
        await property.destroy();
        return res.redirect('/properties');
    } catch (error) {
        console.log(error);
    }
}

const updatePublicatedProperty = async (req, res)=>{
    const { id } = req.params;
    const property = await PropertiesTable.findByPk(id);
    
    if(!property){
        return res.json({
            res: 'Property not found'
        });
    }

    property.publicated = !property.publicated;
    const newStatus = property.publicated ? 1 : 0;
    property.save()

    return res.json({
        res: 'ok',
        newStatus
    });
}

const propertyInformation = async (req, res)=>{
    const { id } = req.params;
    const categories = await CategoryTable.findAll();

    const property = await PropertiesTable.findByPk(id,{
        include: [
            { model: CategoryTable, as: 'category' },
            { model: PriceTable, as: 'price' }
        ]
    });
    
    if(!property || !property.publicated){
        return res.redirect('/properties')
    }

    const seller = isSeller(req.user?.id, property.userId);

    return res.render('./properties/property.pug', {
        page: 'Property',
        property,
        categories,
        user: req.user,
        seller
    })
}

const sendMsgToSeller = async (req, res)=>{
    let result = validationResult(req);

    let { id } = req.params;
    
    if(!result.isEmpty()){
        const categories = await CategoryTable.findAll();
        
        const property = await PropertiesTable.findByPk(id,{
            include: [
                { model: CategoryTable, as: 'category' },
                { model: PriceTable, as: 'price' }
            ]
        });
        
        if(!property){
            return res.redirect('/properties')
        }
        
        const seller = isSeller(req.user?.id, property.userId);
        
        return res.render('./properties/property.pug', {
            page: 'Property',
            property,
            categories,
            user: req.user,
            seller,
            errorsSendingData: result.array()
        })
    }

    let propertyId = id;
    const { msgFile: message } = req.body;
    const userId = req.user.id;

    await MessageTable.create( {message, propertyId, userId} );
    return res.redirect('/');
}

const propertyMessages = async (req, res)=>{
    const { id } = req.params;

    const property = await PropertiesTable.findByPk(id,{
        include: [
            { model: MessageTable, as: 'messages',
                include: [
                    { model: User, as: 'user' }
                ]
            }
        ]
    });
    
    
    if(!property){
        return res.redirect('/properties');
    }

    const { user } = req;
    if(!user || user.id != property.userId){
        return res.redirect('/properties');
    }

    return res.render('./properties/msgProperty.pug',{
        page: 'Messages',
        property,
        categories: req.categoriesAux
    });
}

export {
    myProperties,
    createProperties,
    saveProperty,
    addImage,
    saveImage,
    editProperty,
    updateProperty,
    deleteProperty,
    updatePublicatedProperty,
    propertyInformation,
    sendMsgToSeller,
    propertyMessages
}