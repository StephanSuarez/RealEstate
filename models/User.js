import { DataTypes } from "sequelize";
import bcrypt from 'bcrypt'
import sequelizedb from "../config/db.js";

const User = sequelizedb.define('users', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token: DataTypes.STRING,
    confirm: DataTypes.BOOLEAN
},{
    hooks: {
        beforeCreate: async function(userData){
            const saltRounds = await bcrypt.genSalt(10);
            userData.password = await bcrypt.hash(userData.password, saltRounds);
        }
    },
    scopes: {
        excludeAttributes: {
            attributes: {
                exclude: ['password', 'token', 'confirm', 'createdAt', 'updatedAt']
            }
        }
    }
});

User.prototype.checkPassword = function(password){
    return bcrypt.compareSync(password, this.password)
}

export default User;
