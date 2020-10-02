"use strict";
const bcrypt = require("bcryptjs");

const hashedPassword1 = bcrypt.hashSync("masha", 10);
const hashedPassword2 = bcrypt.hashSync("sasha", 10);
const hashedPassword3 = bcrypt.hashSync("yasha", 10);

const users = [
  {
    name: "Test Masha",
    login: "masha",
    email: "testing_masha@ya.ru",
    password: hashedPassword1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Test Sasha",
    login: "sasha",
    email: "testing_sasha@ya.ru",
    password: hashedPassword2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Test Yasha",
    login: "Yasha",
    email: "testing_yasha@ya.ru",
    password: hashedPassword3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", users, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
