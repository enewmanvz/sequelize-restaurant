const {sequelize, DataTypes, Model} = require('./db')
//import models
const { Menu } = require('./Menu')
const { Restaurant } = require('./Restaurant')
const { MenuItem } = require('./MenuItem')

//associate models
//adds foreign key to restaurant table connecting a menu instance to a specific restaurant
Menu.belongsTo(Restaurant)

//gives us sequelize methods for a one to many relationship
Restaurant.hasMany(Menu)

MenuItem.belongsTo(Menu)

Menu.hasMany(MenuItem)

MenuItem.belongsTo(Restaurant)

Restaurant.hasMany(MenuItem)

//export models with added associations
module.exports = {Menu, Restaurant, MenuItem, sequelize}
