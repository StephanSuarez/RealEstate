import { DataTypes } from "sequelize";
import sequelizedb from "../config/db.js";

const PriceTable = sequelizedb.define("price", {
    price: {
        type: DataTypes.STRING(30),
        allowNull: false
    }
})

export default PriceTable;