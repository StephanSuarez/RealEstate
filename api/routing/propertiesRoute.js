import { body } from 'express-validator';
import { Router } from 'express';
import { myProperties, createProperties, saveProperty, addImage, saveImage, editProperty, updateProperty, deleteProperty, updatePublicatedProperty, propertyInformation, sendMsgToSeller, propertyMessages } from '../controller/propertiesController.js';
import findCategories from '../../middleware/findCategories.js';
import protectRoute from '../../middleware/protectRoute.js';
import uploadImageProperty from '../../middleware/uploadImg.js';
import identifyUser from '../../middleware/identifyUser.js';

const router = Router()

router.get('/properties', protectRoute, identifyUser, findCategories, myProperties);

router.get('/properties/create', protectRoute, identifyUser, createProperties);
router.post('/properties/create',
    protectRoute,
    body('title').notEmpty().withMessage('Must have a title'),
    body('description').notEmpty().withMessage('Must have a description').isLength({ max: 200 }).withMessage('Your description cannot have more than 200 characters'),
    body('category').isNumeric().withMessage('Select a category'),
    body('price').isNumeric().withMessage('Select a price'),
    body('rooms').isNumeric().withMessage('Select an amount of rooms'),
    body('parking').isNumeric().withMessage('Select an amount of parking'),
    body('bathrooms').isNumeric().withMessage('Select an amount of bathrooms'),
    body('addressData').notEmpty().withMessage('Select an ubication please'),
    saveProperty
)

router.get('/properties/addimage/:id', protectRoute, identifyUser, findCategories, addImage);
router.post('/properties/addimage/:id', protectRoute, identifyUser, uploadImageProperty.single('addImagesProperty'), saveImage);

router.get('/properties/edit/:id', protectRoute, identifyUser, findCategories, editProperty);
router.post('/properties/edit/:id',
    protectRoute,
    body('title').notEmpty().withMessage('Must have a title'),
    body('description').notEmpty().withMessage('Must have a description').isLength({ max: 200 }).withMessage('Your description cannot have more than 200 characters'),
    body('category').isNumeric().withMessage('Select a category'),
    body('price').isNumeric().withMessage('Select a price'),
    body('rooms').isNumeric().withMessage('Select an amount of rooms'),
    body('parking').isNumeric().withMessage('Select an amount of parking'),
    body('bathrooms').isNumeric().withMessage('Select an amount of bathrooms'),
    body('addressData').notEmpty().withMessage('Select an ubication please'),
    updateProperty
);

router.get('/properties/edit/:id', protectRoute, editProperty);
router.post('/property/delete/:id', protectRoute, deleteProperty);
router.put('/property/update-publicated/:id', protectRoute, updatePublicatedProperty);

router.get('/property/information/:id', identifyUser, propertyInformation);
router.post('/property/information/:id',
    body('msgFile').notEmpty().withMessage('Tell the seller you want conctact him/her'),
    identifyUser, sendMsgToSeller);

router.get('/property/:id/messages', identifyUser, findCategories, propertyMessages);

export default router