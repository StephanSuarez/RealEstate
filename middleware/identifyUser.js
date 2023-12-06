import jwt from 'jsonwebtoken';
import { User } from '../models/asociation.js';

const identifyUser = async (req, res, next)=>{
    const { _token } = req.cookies;

    if(!_token){
        req.User = null;
        return next();
    }
    
    try {
        const decode = jwt.verify(_token, process.env.JWT_AUTHENTICATION    );
        const user = await User.scope('excludeAttributes').findByPk(decode.id);
        if(user){
            req.user = user;
        }
        return next();
    } catch (error) {
        console.log(error);
        res.clearCookie('_token').redirect('/authentication/login');
    }
}

export default identifyUser;