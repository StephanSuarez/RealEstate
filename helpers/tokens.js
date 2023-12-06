import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

const generateId = ()=>{
    const uniqueId = uuidv4();
    return uniqueId
}

const generateJWT = (id, name) => jwt.sign({ id, name }, process.env.JWT_AUTHENTICATION, { expiresIn: '1d' });

export {
    generateId,
    generateJWT
}