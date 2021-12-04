const {sequelize,DataTypes,Model}=require('./db')

class Restaurant extends Model{
}

Restaurant.init({
    name:DataTypes.STRING,
    cuisine: DataTypes.STRING,
   // menu_items:DataTypes.STRING,
   // price:DataTypes.INTEGER
},{sequelize,
  timestamps:false})

  module.exports={Restaurant}
