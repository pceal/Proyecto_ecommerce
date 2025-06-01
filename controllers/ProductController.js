const { INSERT } = require("sequelize/lib/query-types");
const { Product, Order, Sequelize } = require("../models/index.js");
const order = require("../models/order.js");
const product = require("../models/product.js");
const { Op } = Sequelize




const ProductController = {
  // Crear un género
  async insert(req, res) {
    try {
      const product = await Product.create({
        name: req.body.name,
        price: req.body.price, 
      });
      res.status(201).send({ message: "producto creado con éxito", product });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error al crear el producto", error });
    }
  },
async getAll(req, res) {
        try {
            const products = await Product.findAll({
                //include: [Post]
            })
            res.status(200).send({ msg: 'Todos los productos', products })
        } catch (error) {
            res.status(500).send(error)
        }
    },

     async update(req, res) {
        await Product.update(req.body,
            {
                where: {
                    id: req.params.id
                }
            })
        res.send('Usuario actualizado con éxito');
    }, 
    async delete(req, res) {
        await Product.destroy({
            where: {
                id: req.params.id
            }
        })
        res.send(
            'el producto ha sido eliminada con éxito'
        )
    },
     async getById(req, res) {
        try {
            const product = await Product.findByPk(req.params.id)
            res.status(200).send(product)
        } catch (error) {
            res.status(500).send({ message: 'Ha habido un problema al cargar el producto' })
        }
    },
     async getOneByName(req, res) {
        try {
            const product = await Product.findOne({
                where: {
                    name: {
                        [Op.like]: `%${req.params.name}%`
                    }
                },
                //include: [Order]
            })
            res.status(200).send(product)
        } catch (error) {
            res.status(500).send({ message: 'Ha habido un problema al cargar el producto' })
        }
    }, 
    // ... (otros métodos como insert, getById, etc.) ...

    // Nueva función asíncrona para obtener todos los productos ordenados por precio (mayor a menor)
    async getAllOrderedByPriceAsc(req, res) {
        try {
            const products = await Product.findAll({
                product: [
                    ['price', 'ASC'] // Ordenar por la columna 'price' en orden descendente
                ]
            });
            res.status(200).send(products);
        } catch (error) {
           res.status(500).send({ message: "Ha habido un problema al obtener los productos ordenados por precio", error: error.message });
        }
    },
};




 module.exports = ProductController;