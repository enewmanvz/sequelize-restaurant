//import the associated models from index.js
const {Menu, Restaurant, sequelize} = require('./index')

//test musician database CRUD
describe('Menu Database', () => {

    beforeAll(async() => {
        //reset database
        await sequelize.sync({force:true})
        //create array of bands
        const arrayOfMenu = [
            {menu_name: 'Chicken & Sandwiches'},
            {menu_name: 'Breakfast'}
        ]
        //create array of musicians
        const arrayOfRestaurant =[
            {Restaurant_name: 'McDonalds'},
            {Restaurant_name: 'Burger King'}
        ]
        //create array of musicians
        const arrayOfMenuItem =[
            {MenuItem_name: 'Chocolate Croissant'},
            {MenuItem_name: 'Big Mac'}
        ]

        //add arrays to database
        await Restaurant.bulkCreate(arrayOfRestaurant)
        await Menu.bulkCreate(arrayOfMenu)
        await MenuItem.bulkCreate(arrayOfMenuItem)
    })

   // create instances of Musician Model for testin
   test('menu has name', async() => {
    //read test instance from db
    const testMenu = await Menu.findOne({where: {menu_name: 'Breakfast'}});
    expect(testMenu.menu_name).toBe('Breakfast')  
    expect(testMenu instanceof Menu).toBeTruthy()
    
   })
   // create instances of Musician Model for testin
   test('restaurant has name', async() => {
    //read test instance from db
    const testRestaurant = await Restaurant.findOne({where: {restaurant_name: 'McDonalds'}});
    expect(testRestaurant.restaurant_name).toBe('McDonalds')  
    expect(testRestaurant instanceof Restaurant).toBeTruthy()
    
   })
   // create instances of Musician Model for testin
   test('menuItem has name', async() => {
    //read test instance from db
    const testMenuItem = await MenuItem.findOne({where: {menuItem_name: 'Breakfast'}});
    expect(testMenu.menu_name).toBe('Breakfast')  
    expect(testMenu instanceof Menu).toBeTruthy()
    
   })






})
