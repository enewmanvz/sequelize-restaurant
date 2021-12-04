const {sequelize,DataTypes,Model}=require('./db')
class MenuItem extends Model{
}

MenuItem.init({    
    name:DataTypes.STRING,    
    price:DataTypes.FLOAT,
    calories:DataTypes.INTEGER,
    
},{sequelize,
  timestamps:false})
  module.exports={MenuItem}