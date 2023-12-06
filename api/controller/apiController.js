import { PropertiesTable, CategoryTable, PriceTable } from '../../models/asociation.js'

const getProperties = async (req, res) => {

    const properties = await PropertiesTable.findAll({
        where: {
            publicated: true
        },
        include: [
            {model: CategoryTable, as: 'category'},
            {model: PriceTable, as: 'price'}
        ]
    });

    res.json(properties)
}

export { 
    getProperties
}