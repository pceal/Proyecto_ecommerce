const { Order, User, } = require("../models/index.js"); // en algun momento hay que añadir { Order, User, sequeleze} 
//const { Op } = Sequelize
//const order = require("../models/order.js");


const OrderController =  {
    async create(req, res) {
        try {
            const order = await Order.create(req.body)
            res.status(201).send({ msg: "Order creado con éxito", order })
        } catch (error) {
            res.status(500).send(error)
        }
    },
    async getAll(req, res) {
        try {
            const orders = await Order.findAll({
                // include: [User]
                include: [{ model: Products, attributes: ["name"] }]
            })
            res.status(200).send(orders)
        } catch (error) {
            console.log(error)
            res.status(500).send({ message: 'Ha habido un problema al cargar los pedidos' })
        }
    }, //mirar desde aqui 
     /*async getById(req, res) {
        try {
            const order = await Order.findByPk(req.params.id, {
                include: [Product]
            })
            res.status(200).send(post)
        } catch (error) {
            res.status(500).send({ message: 'Ha habido un problema al cargar el pedido' })
        }
    },
    async getOneByNumber(req, res) {
        try {
            const Order = await Post.findOne({
                where: {
                    number: {
                        [Op.like]: `%${req.params.number}%`
                    }
                },
                include: [User]
            })
            res.status(200).send(number)
        } catch (error) {
            res.status(500).send({ message: 'Ha habido un problema al cargar el pedido' })
        }
    },*/
    };

    module.exports = OrderController;