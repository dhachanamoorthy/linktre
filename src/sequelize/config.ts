import { Dialect } from "sequelize";
export const Config = () => {
  console.log("Entered pg config");
  return {
    // uri: `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DATABASE}`,
    uri: process.env.DATABASE_URL,
    options: {
      ssl: true,
      dialect: "postgres" as Dialect,
      benchmark: true,
      logging: null,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      define: {
        underscored: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at",
      },
    },
  };
};
