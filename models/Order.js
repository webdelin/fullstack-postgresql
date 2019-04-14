const Sequelize = require('sequelize')
const keys = require('../config/keys')

const db = new Sequelize(keys.dbUri)

const Order = db.define('orders',

    {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        date: {
            type: Sequelize.DATE,
            defaultValue: Date.now
        },
        order: {
            type: Sequelize.STRING
        },
        list: {
            type: Sequelize.JSON,
            args: {
                name: {
                    type: Sequelize.STRING
                },
                quantity: {
                    type: Sequelize.NUMBER
                },
                cost: {
                    type: Sequelize.NUMBER
                }
            }
        },
        user: {
            type: Sequelize.UUID,
            references: {
                model: 'users',
                key: 'id'
            }
        }
    },
    {
        schema: 'public'
    }
)

Order.sync({
    //force: true
})
module.exports = {
    db,
    Order
}
