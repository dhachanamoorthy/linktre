/* eslint-disable arrow-body-style */
Sequelize = require("sequelize");
module.exports = {
  up: async (queryInterface) => {
    try {
      return queryInterface.sequelize.transaction(
        { autocommit: false },
        async (transaction) => {
          await queryInterface.createTable(
            "trees",
            {
              id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
              },
              user_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                  model: "users",
                  key: "id",
                },
              },
              tree_name: {
                allowNull: true,
                type: Sequelize.TEXT,
              },
              description: {
                allowNull: true,
                type: Sequelize.TEXT,
              },
              tree_bg: {
                allowNull: true,
                type: Sequelize.TEXT,
              },
              created_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: new Date().toUTCString(),
              },
              updated_at: {
                allowNull: true,
                type: Sequelize.DATE,
              },
              deleted_at: {
                allowNull: true,
                type: Sequelize.DATE,
              },
            },
            { transaction }
          );
        }
      );
    } catch (e) {
      throw new Error("19700101000000000-tree migration failed!");
    }
  },
  down: async (queryInterface) => {
    try {
      return queryInterface.sequelize.transaction(
        { autocommit: false },
        async (transaction) => {
          await queryInterface.dropTable("tree", { transaction });
        }
      );
    } catch (e) {
      throw new Error("19700101000000000-tree migration failed!");
    }
  },
};
