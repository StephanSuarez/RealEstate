import { DataTypes } from "sequelize";
import sequelizedb from "../config/db.js";

const MessageTable = sequelizedb.define("message", {
    message: {
        type: DataTypes.STRING(250),
        allowNull: false
    }
})

export default MessageTable;