import { DataTypes } from "sequelize";
import sequelizedb from "../config/db.js";

const CategoryTable = sequelizedb.define("category", {
    category: {
        type: DataTypes.STRING(60),
        allowNull: false
    }
});

export default CategoryTable;
