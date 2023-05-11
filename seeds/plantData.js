const sequelize = require("../config/connection")
const { Plant } = require("../models");

const seedPlants = async () => {
  await sequelize.sync({ force: true });
  await Plant.bulkCreate(plantData);
  console.log('\n----- Plants seeded -----\n');
  process.exit(0);
}


module.exports = seedPlants;