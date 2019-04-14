const { Category } = require('../models/Category')
const { Position } = require('../models/Position')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function (req, res) {
    try {
        const categories = await Category.findOne({
            where: {
                user: req.user.id
            }
        })
        res.status(201).json(categories)
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.getById = async function (req, res) {
    try {
        const categorie = await Category.findOne({
            where: {
                id: req.params.id
            }
        })
        res.status(201).json(categorie)
    } catch (e) {
        errorHandler(res, e)
    }

}
module.exports.remove = async function (req, res) {
    try {
        await Category.remove({
            where: {
                id: req.params.id
            }
        })
        await Position.remove({
            where: {
                category: req.params.id
            }
        })
        res.status(200).json({
            message: 'Category and position removed'
        })
    } catch (e) {
        errorHandler(res, e)
    }

}
module.exports.create = async function (req, res) {
    const catName = await Category.findOne(
        {
            where: {
                name: req.body.name
            }
        })
    if(catName){
        res.status(409).json({
            message: 'Category already exist'
        })
    } else {
        try {
            const category = await Category.create({
                name: req.body.name,
                user: req.user.id,
                title: req.body.title,
                h1_title: req.body.h1_title,
                alias: req.body.alias,
                image: req.file ? req.file.path : '',
                description: req.body.description
            })
            res.status(201).json(category)
        } catch (e) {
            errorHandler(res, e)
        }
    }

}
module.exports.update = async function (req, res) {

    const catName = await Category.findOne(
        {
            where: {
                id: req.params.id
            }
        })
    if(catName){
        const updated = {
            name: req.body.name,
            user: req.user.id,
            title: req.body.title,
            h1_title: req.body.h1_title,
            alias: req.body.alias,
            description: req.body.description
        }
        if(req.file){
            updated.image = req.file.path
        }
        try {
            const category = await Category.update({
                $set: updated,
                new: true
            })
            res.status(200).json(category)
        } catch (e) {
            errorHandler(res, e)
        }
    } else {
        res.status(409).json({
            message: 'Category dont no exist'
        })
    }
}
