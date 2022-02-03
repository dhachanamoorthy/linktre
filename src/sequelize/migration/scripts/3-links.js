/* eslint-disable arrow-body-style */
Sequelize = require("sequelize");
module.exports = {
  up: async (queryInterface) => {
    try {
      return queryInterface.sequelize.transaction(
        { autocommit: false },
        async (transaction) => {
          await queryInterface.createTable(
            "links",
            {
              id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
              },
              tree_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                  model: "trees",
                  key: "id",
                },
              },
              link_name: {
                allowNull: true,
                type: Sequelize.TEXT,
              },
              link_url: {
                allowNull: false,
                type: Sequelize.TEXT,
              },
              description: {
                allowNull: true,
                type: Sequelize.TEXT,
              },
              disabled: {
                allowNull: false,
                type: Sequelize.BOOLEAN,
                defaultValue: false,
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
      throw new Error("19700101000000000-links migration failed!");
    }
  },
  down: async (queryInterface) => {
    try {
      return queryInterface.sequelize.transaction(
        { autocommit: false },
        async (transaction) => {
          await queryInterface.dropTable("links", { transaction });
        }
      );
    } catch (e) {
      throw new Error("19700101000000000-links migration failed!");
    }
  },
};
