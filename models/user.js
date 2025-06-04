'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        
      User.hasMany(models.Order);
      User.hasMany(models.Token)
    }
  }
  User.init({
    name:{
     type:DataTypes.STRING,
    allowNull: false,
      validate: {
        notNull: {
          msg: "Por favor introduce tu nombre",
        },
      },
    },
    lastname: {
    type: DataTypes.STRING,
     allowNull: false,
     validate: {
        notNull: {
          msg: "Por favor introduce tu nombre",
        },
      },
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Por favor introduce tu apellido",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Por favor introduce tu correo electrónico",
        },
        isEmail: {
          msg: "Por favor introduce un correo electrónico válido",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Por favor introduce tu contraseña",
        },
        len: {
          args: [6, 100],
          msg: "La contraseña debe tener entre 6 y 100 caracteres",
        },
      },
    },
    role:DataTypes.STRING,
      
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};