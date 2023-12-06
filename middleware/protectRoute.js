import jwt from 'jsonwebtoken';
import { User } from '../models/asociation.js';

const protectRoute = async (req, res, next)=>{
    
    const { _token } = req.cookies;
    // validate JWT
    if(!_token) {
        return res.redirect('/authentication/login');
    }

    try {
        // decoding JWT
        const jwtDecode = jwt.verify(_token, process.env.JWT_AUTHENTICATION);
        const user = await User.scope('excludeAttributes').findByPk(jwtDecode.id);
        if(user){
            req.user = user;
        } else {
            return res.redirect('/authentication/login');
        }
        return next();
    } catch (error) {
        return res.redirect('/authentication/login');
    }
}


export default protectRoute;
