const bcrypt = require("bcryptjs");
const { User,Order,Token, Sequelize, Product, OrderProduct } = require('../models/index.js');
const { Op } = Sequelize;
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/config.json")["development"]



const UserController = {
    async create(req, res, next) {
        try{
            const password = await bcrypt.hash(req.body.password, 10)
            const user = await User.create({ ...req.body, password: password, confirmed: false, role: "user" })
         res.status(201).send({ msg: 'Usuario creado con éxito', User })
        } catch(error){
            console.error(error);
            // res.status(500).send(error)
            next(error);
        }
    },
    async login(req, res) {
        try {
            const user = await User.findOne({
                where: {
                    email: req.body.email
                }
            })
          
            const isMatch = bcrypt.compareSync(req.body.password, user.password);
            if (!user) {
                return res.status(400).send({ message: "Usuario o contraseña incorrectos" })
            }
            if (!isMatch) {
                return res.status(400).send({ message: "Usuario o contraseña incorrectos" })
            }
            const token = jwt.sign({ id: user.id }, jwt_secret);
            await Token.create({ token, UserId: user.id,});
            res.send({ message: 'Bienvenid@ ' + user.name, user, token });
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    },
    
    async getAll(req, res) {
        try {
            //req.body.ProductId = req.product.name
            const users = await User.findAll({
                include: [
                    {
                        model: Order, // Incluye el modelo Order
                        as: 'Orders', // <-- Usa el alias definido en User.js para Order (User.hasMany(models.Order, {as: 'Orders'}))
                        include: [ // <-- ¡Aquí es donde anidas la inclusión de Product!
                            {
                                model: Product, // Incluye el modelo Product
                                as: 'Products', // <-- Usa el alias definido en Order.js para Product (Order.belongsToMany(models.Product, {as: 'Products'}))
                                through: {
                                    // Puedes especificar qué atributos de la tabla intermedia OrderProduct quieres mostrar
                                    // Si no quieres ninguno, usa attributes: []
                                    attributes: [] // Ejemplo: si tienes 'quantity' en tu tabla OrderProduct
                                }
                            }
                        ]
                
            },
        ]
                //include: [Order],
             
                
            })
            res.status(200).send({ msg: 'Todos los usuarios', users })
        } catch (error) {
            res.status(500).send(error)
        }
    },
    
    async update(req, res) {
        await User.update(req.body,
            {
                where: {
                    id: req.params.id
                }
            })
        res.send('Usuario actualizado con éxito')
    
    
    },
     async logout(req, res) {
        try {
            await Token.destroy({
                where: {
                    [Op.and]: [
                        { UserId: req.user.id },
                        { token: req.headers.authorization }
                    ]
                }
            });
            res.send({ message: 'Desconectado con éxito' })
        } catch (error) {
            console.log(error)
            res.status(500).send({ message: 'hubo un problema al tratar de desconectarte' })
        }
    },
    
};
   

module.exports = UserController;