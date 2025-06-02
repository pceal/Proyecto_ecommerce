   const { Category,Product,Sequelize } = require("../models/index.js"); 
   const { Op } = Sequelize// en algun momento hay que añadir { Order, User, sequeleze} 
//const { Op } = Sequelize
//const order = require("../models/order.js");


const CategoryController =  {
    async create(req, res) {
        try {
            const category = await Category.create(req.body)
            res.status(201).send({ msg: " La Categoria ha sigo creada con éxito", category })
        } catch (error) {
            res.status(500).send(error)
        }
    },
    async getAll(req, res) {
        try {
            const categories = await Category.findAll({
                // include: [User]
                //include: [{ model: Categories, attributes: ["name"] }]
            })
            res.status(200).send(categories)
        } catch (error) {
            console.log(error)
            res.status(500).send({ message: 'Ha habido un problema al cargar las categorias' })
        }
    },
    async update(req, res) {
        await Category.update(req.body,
            {
                where: {
                    id: req.params.id
                }
            })
        res.send('Categoria actualizada con éxito');
    }, 
     async delete(req, res) {
        await Category.destroy({
            where: {
                id: req.params.id
            }
        })
        res.send(
            'la categoria ha sido eliminada con éxito'
        )
    },
     async getById(req, res) {
        try {
            const category = await Category.findByPk(req.params.id)
            res.status(200).send(category)
        } catch (error) {
            res.status(500).send({ message: 'Ha habido un problema al cargar el producto' })
        }
    },
     async getOneByName(req, res) {
        try {
            const category = await Category.findOne({
                where: {
                    name: {
                        [Op.like]: `%${req.params.name}%`
                    }
                },
                //include: [Order]
            })
            res.status(200).send(category)
        } catch (error) {
            res.status(500).send({ message: 'Ha habido un problema al cargar el producto' })
        }
    }, 
};   



module.exports = CategoryController;