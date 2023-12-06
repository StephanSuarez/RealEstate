import { exit } from "node:process"
import sequelizedb from "../config/db.js";
import categories from "./categories.js";
import users from "./users.js";
import prices from "./prices.js";
import { CategoryTable, PriceTable, User } from "../models/asociation.js"

const importData = async ()=>{
    try {
        // Authenticate DB
        await sequelizedb.authenticate();

        // Create columns
        await sequelizedb.sync();

        // Insert Data
        await Promise.all([
            CategoryTable.bulkCreate(categories),
            PriceTable.bulkCreate(prices),
            User.bulkCreate(users)
        ])
        console.log('Insert DAta Succesfully')
        exit();

    } catch (error) {
        console.log(error);
        exit(1);
    }
}

const deleteData = async ()=>{
    try {
        await sequelizedb.sync({ force: true });
        console.log('Data Deleted Success');
        exit();
    } catch (error) {
        console.log(error);
        exit(1);
    }
}

if(process.argv[2]==='-i'){
    importData();
}

if(process.argv[2]=== '-d'){
    deleteData();
}
