const { Order, User, Product, OrderWithProducts } = require("../models/index.js"); // en algun momento hay que añadir { Order, User, sequeleze} 





const OrderController =  {
    async create(req, res) {
        try {
            const order = await Order.create(req.body)
             await order.addProducts(req.body.ProductIds)
             const OrderWithProducts = await Order.findByPk(order.id, {
                include: [
                    {
                        model: Product,
                        as: "Products",
                        through: { attributes: [] }, // Oculta la tabla intermedia
                    },
                ],
            });
            res.status(201).send({ msg: "pedido creado con éxito", OrderWithProducts })
        } catch (error) {
            console.error(error);
            res.status(500).send(error)
        }
    },
    async getAll(req, res) {
        try {
            const orders = await Order.findAll({
                       include: [
{
                        model: Product,
                        as: "Products",
                        through: { attributes: ["name"] },
                   },
                    
                ],
            });
            
 
            res.status(200).send(orders)
        } catch (error) {
            console.log(error)
            res.status(500).send({ message: 'Ha habido un problema al cargar los pedidos' })
        }
    }, 
    };

    module.exports = OrderController;