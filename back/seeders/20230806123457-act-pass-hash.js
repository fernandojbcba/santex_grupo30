'use strict';
//esto actualiza el pass en la base de datos, cuando está en texto plano
const bcrypt = require('bcrypt');
const { User } = require('../models'); // Asegúrate de importar el modelo correcto

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const usersToUpdate = await User.findAll();

    for (const user of usersToUpdate) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await user.update({ password: hashedPassword });
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Se puede dejar el método down vacío 
  },
};
 
