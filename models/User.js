const Sequelize = require('sequelize')
const keys = require('../config/keys')

const db = new Sequelize(keys.dbUri)

const User = db.define('users',
    {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            unique:true,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
                notEmpty: true
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    },
    {
        schema: 'public'
    }
)
User.sync({
    //force: true
});
module.exports = {
    db,
    User
}
