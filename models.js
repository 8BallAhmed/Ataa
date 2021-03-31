const { Sequelize, DataTypes, where } = require("sequelize");

const db = new Sequelize("postgres://postgres:password@localhost:5432/ataa");

async function connect() {
  await db.authenticate().then((result) => {
    console.log(
      `Connection to ${db.getDialect()}@${db.getDatabaseName()} has been established`
    );
  });
}

const members = db.define("members", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  major: { type: DataTypes.STRING, allowNull: false },
});

async function syncTables() {
  await members
    .sync()
    .then(
      console.log(
        `Table ${members.tableName} has synced successfully to the database.`
      )
    );
}

connect();
syncTables();

exports.db = db;
exports.members = members;
