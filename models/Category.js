const Sequelize = require('sequelize')
const keys = require('../config/keys')

const db = new Sequelize(keys.dbUri)

const Category = db.define('categories',
    {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true
            }
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true
            }
        },
        h1_title: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true
            }
        },
        alias: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true
            }
        },
        image: {
            type: Sequelize.ARRAY(Sequelize.STRING),
            defaultValue: ['demo.png']
        },
        sub_id: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        description: {
            type: Sequelize.TEXT,
            defaultValue: ''
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

Category.sync({
    //force: true
})
module.exports = {
    db,
    Category
}
