const Sequelize = require('sequelize')

const db = new Sequelize('postgres://fullstack:Wendelin6@5.189.143.82:5432/fullstack');

const User = db.define('users',
    {
        uuid: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
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
module.exports = {
    db,
    User
}
