import User from "./User.js"
import PropertiesTable from "./Properties.js";
import CategoryTable from "./Category.js";
import PriceTable from "./Price.js";
import MessageTable from "./message.js";

PropertiesTable.belongsTo(PriceTable, {foreingKey: 'priceId'});
PropertiesTable.belongsTo(CategoryTable, {foreingKey: 'categoryId'});
PropertiesTable.belongsTo(User, {foreingKey: 'userId'});
PropertiesTable.hasMany(MessageTable, {foreingKey: 'messages'})

MessageTable.belongsTo(PropertiesTable, {foreingKey: 'propertyId'});
MessageTable.belongsTo(User, {foreingKey: 'userId'});

export {
    User,
    PropertiesTable,
    CategoryTable,
    PriceTable,
    MessageTable
}