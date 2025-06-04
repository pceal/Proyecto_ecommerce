//const { INSERT } = require("sequelize/lib/query-types");
const { Product, Category, Order, Sequelize } = require("../models/index.js");
//const order = require("../models/order.js");
//const product = require("../models/product.js");
const { Op } = Sequelize




const ProductController = {
    
    async insert(req, res, next) {
        try {
            //req.body.UserId = req.user.id // Añadir el UserId del usuario autenticado
            const product = await Product.create({
                name: req.body.name,
                price: req.body.price,
            });
            //añadir para relaciones (busca id de categorias)
            // const categories = await Category.findAll({
            //     where: { id: req.body.CategoryIds },
            // });
            //añadir para hacer la relacion
            // if (categoty.length !== req.body.CategoryIds.length) {
            await product.addCategories(req.body.CategoryIds)
            // añadir para relaciones Respuesta con el producto y sus categorias
            const productWithCategories = await Product.findByPk(product.id, {
                include: [
                    {
                        model: Category,
                        as: "Categories",
                        through: { attributes: [] }, // Oculta la tabla intermedia
                    },
                ],
            });
            // añadir para relaciones
            // Respuesta con el producto y sus categorías
            res.status(201).send({ message: "producto creado con éxito", productWithCategories });
        } catch (error) {
            console.error(error);
            //res.status(500).send({ message: "Error al crear el producto", error });
            next(error); // Pasar el error al middleware de manejo de errores
        }
    },
    async getAll(req, res) {
        try {;
            const products = await Product.findAll({
                include: [
          {
            model: Order,
            as: "Orders",
            through: { attributes: [] }, // Oculta la tabla intermedia
          },
        ],
                  
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
                order: [
                    ['price', 'ASC'] // Ordenar por la columna 'price' en orden ascendente
                ]
            });
            res.status(200).send(products);
        } catch (error) {
            res.status(500).send({ message: "Ha habido un problema al obtener los productos ordenados por precio", error: error.message });
        }
    },
};
/* const genres = await Genre.findAll({
          where: { id: req.body.GenreIds },
        });

        if (genres.length !== req.body.GenreIds.length) {
          return res.status(404).send({ message: "Some genres not found" });
        }

        await book.addGenres(req.body.GenreIds); // Método mágico de Sequelize
      }

      // Respuesta con el libro y sus géneros
      const bookWithGenres = await Book.findByPk(book.id, {
        include: [
          {
            model: Genre,
            as: "Genres",
            through: { attributes: [] }, // Oculta la tabla intermedia
          },
        ],
      });

      res.status(201).send(bookWithGenres);
    } catch (error) {
      console.error("Error detallado:", error);
      res.status(500).send({
        message: "Error creating book",
        error: error.message,
      });
    }
  },

  // Obtener todos los libros con sus géneros
  async getAll(req, res) {
    try {
      const books = await Book.findAll({
        include: [
          {
            model: Genre,
            as: "Genres",
            through: { attributes: [] }, // Oculta la tabla intermedia
          },
        ],
      });
      res.send(books);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error al obtener libros", error });
    }
  },
};*/




module.exports = ProductController;