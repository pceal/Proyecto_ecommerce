const { User,Order } = require('../models/index.js');
const UserController = {
    async create(req, res) {
        try{
            req.body.role = "user" // Asignar un rol por defecto
            const user = await User.create(req.body)
            res.status(201).send({ msg: 'Usuario creado con éxito', user })
        } catch(error){
            res.status(500).send(error)
        }
    },

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