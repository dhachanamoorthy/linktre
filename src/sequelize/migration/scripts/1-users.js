/* eslint-disable arrow-body-style */
Sequelize = require('sequelize');
module.exports = {
  up: async (queryInterface) => {
    try {
      return queryInterface.sequelize.transaction(
        { autocommit: false },
        async (transaction) => {
          await queryInterface.createTable(
            'users',
            {
              id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
              },
              username: {
                allowNull: false,
                type: Sequelize.TEXT,
              },
              mobile: {
                allowNull: true,
                type: Sequelize.BIGINT,
              },
              password: {
                allowNull: true,
                type: Sequelize.TEXT,
              },
              email: {
                allowNull: true,
                type: Sequelize.TEXT,
              },
              fb_url: {
                allowNull: true,
                type: Sequelize.TEXT,
              },
              insta_url: {
                allowNull: true,
                type: Sequelize.TEXT,
              },
              twitter_url: {
                allowNull: true,
                type: Sequelize.TEXT,
              },
              youtube_url: {
                allowNull: true,
                type: Sequelize.TEXT,
              },
              normal_web_link: {
                allowNull: true,
                type: Sequelize.TEXT,
              },
              image_url: {
                allowNull: true,
                type: Sequelize.TEXT,
              },
              last_login: {
                allowNull: true,
                type: Sequelize.DATE,
              },
              created_by: {
                allowNull: false,
                type: Sequelize.TEXT,
              },
              updated_by: {
                allowNull: true,
                type: Sequelize.TEXT,
              },
              created_at: {
                allowNull: false,
                type: Sequelize.DATE,
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
            { transaction },
          );
        },
      );
    } catch (e) {
      throw new Error('20210911065335821-user migration failed!');
    }
  },
  down: async (queryInterface) => {
    try {
      return queryInterface.sequelize.transaction(
        { autocommit: false },
        async (transaction) => {
          await queryInterface.dropTable('users', { transaction });
        },
      );
    } catch (e) {
      throw new Error('20210911065335821-user migration failed!');
    }
  },
};