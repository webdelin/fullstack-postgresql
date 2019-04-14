const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { User } = require('../models/User')
const keys = require('../config/keys')
const errorHandler = require('../utils/errorHandler')

module.exports.login = async function (req, res) {
    const candidate = await User.findOne(
        {
            where: {
                email: req.body.email
            }
        })
    if(candidate){
        //Check Password
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
        if(passwordResult){
            //Generate Token
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate.id
            }, keys.jwt, {expiresIn: 60 * 60 * 24})
            res.status(200).json({
                token: `Bearer ${token}`
            })

        } else {
            //Not Logged password not correct
            res.status(401).json({
                message: 'Password not correctly'
            })
        }
    } else {
        // User not Found
        res.status(404).json({
            message: "User not Found"
        })
    }
}

module.exports.register = async function (req, res) {

    const candidate = await User.findOne(
        {
            where: {
                email: req.body.email
            }
        })
    if(candidate){
        res.status(409).json({
            message: 'User exist'
        })
    } else {
        try {
            const salt = bcrypt.genSaltSync(10)
            const password = req.body.password
            const user = await User.create({
                email: req.body.email,
                password: bcrypt.hashSync(password, salt)
            })
            res.status(201).json(user)
        } catch (e) {
            errorHandler(res, e)
        }
    }

}
