const Sequelize = require('sequelize')
const keys = require('../config/keys')

const db = new Sequelize(keys.dbUri)

const Position = db.define('positions',
    {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: true,
            unique: true,
            validate: {
                notEmpty: true
            }
        },
        cost: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        category: {
            type: Sequelize.UUID,
            references: {
                model: 'categories',
                key: 'id'
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

Position.sync({
    //force: true
})
module.exports = {
    db,
    Position
}
