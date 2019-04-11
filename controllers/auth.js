const { User } = require('../models/User')

module.exports.login = function (req, res) {
    return User
        .findOne({
            email: req.body.email = User.email,
            password: req.body.password = User.password
        })
        .then((users) => res.status(201).send(users))
        .catch((error) => res.status(400).send(error));
}

module.exports.register = async function (req, res) {

    const candidate = await User.findOne({email: req.body.email})

    if(candidate){
        res.status(409).json({
            message: 'User exist'
        })
    } else {
        return User
        .create({
            email: req.body.email,
            password: req.body.password
        })
    }

}
