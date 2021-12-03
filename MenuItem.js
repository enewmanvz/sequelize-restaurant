const {sequelize,DataTypes,Model}=require('./db')
class MenuItem extends Model{
}

MenuItem.init({    
    menuItem_name:DataTypes.STRING,
    price:DataTypes.FLOAT
},{sequelize,
  timestamps:false})
  module.exports={MenuItem}