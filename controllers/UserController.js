const { User,Order } = require('../models/index.js');
//AÑADIR A) const bcrypt = require("bcryptjs")
const UserController = {
    async create(req, res) {
        try{
            // AÑADIR A) const password = await bcrypt.hash(req.body.password, 10)
            //AÑADIR A) const user = await User.create({ ...req.body, password: password, confirmed: false, role: "user" })
            req.body.role = "user" // BORRAR A)
            const user = await User.create(req.body)
            res.status(201).send({ msg: 'Usuario creado con éxito', user })
        } catch(error){
            res.status(500).send(error)
        }
    },
    /* AÑADIR B async login(req, res) {
        try {
            const user = await User.findOne({
                where: {
                    email: req.body.email
                }
            })
            if (!user.confirmed) {
                return res.status(400).send({ message: "Debes confirmar tu correo" })
            }
            const isMatch = bcrypt.compareSync(req.body.password, user.password);
            if (!user) {
                return res.status(400).send({ message: "Usuario o contraseña incorrectos" })
            }
            if (!isMatch) {
                return res.status(400).send({ message: "Usuario o contraseña incorrectos" })
            }*/

    async getAll(req, res) {
        try {
            const users = await User.findAll({
                //include: [Post]
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
        res.send('Usuario actualizado con éxito');
    },
};
   

module.exports = UserController;