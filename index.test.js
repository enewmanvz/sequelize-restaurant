//import the associated models from index.js
const {Menu, Restaurant, MenuItem, sequelize} = require('./index')

//test musician database CRUD
describe('Restaurant Database', () => {

    beforeAll(async() => {
        //reset database
        await sequelize.sync({force:true})
 
        //create array of restaurants
        const arrayOfRestaurant =[
            {name: 'McDonalds', cuisine: 'american'},
            {name: 'LaMadeleine', cuisine: 'french'}
        ]
        //create array of menues
        const arrayOfMenu = [
            {name: 'Breakfast', entree: 'All Day Breakfast'},
            {name: 'Lunch', entree: 'Lunch Classics'}
            
        ]
        //create array of menu items
        const arrayOfMenuItem =[
            {name: 'Chocolate Croissant', price:3.99, calories: 100},
            {name: 'Breakfast Sandwich', price:6.99, calories: 830},
            {name: 'Big Breakfast w/ Hotcakes', price:8.99, calories: 1830},
            {name: 'Chicken McNuggets Meal', price:7.99, calories: 950},
            {name: 'Chicke Pesto Pasta', price:12.99, calories: 985}
        ]

        //add arrays to database
        await Restaurant.bulkCreate(arrayOfRestaurant)
        await Menu.bulkCreate(arrayOfMenu)
        await MenuItem.bulkCreate(arrayOfMenuItem)
    })

   // create instances of Menu Model for testin
   test('menu has name', async() => {
    //read test instance from db
    const testMenu = await Menu.findOne({where: {name: 'Breakfast'}});
    expect(testMenu.name).toBe('Breakfast')  
    expect(testMenu instanceof Menu).toBeTruthy()
    
   })
   // create instances of Restaurant Model for testin
   test('restaurant has name', async() => {
    //read test instance from db
    const testRestaurant = await Restaurant.findOne({where: {name: 'McDonalds'}});
    expect(testRestaurant.name).toBe('McDonalds')  
    expect(testRestaurant instanceof Restaurant).toBeTruthy()
    
   })
   // create instances of MenuItems Model for testin
   test('menuItem has name', async() => {
    //read test instance from db
    const testMenuItem = await MenuItem.findOne({where: {name: 'Chocolate Croissant'}});
    expect(testMenuItem.name).toBe('Chocolate Croissant')  
    expect(testMenuItem instanceof MenuItem).toBeTruthy()
    
   })
   test('can create a menu', async() => {
    //read test Menu instance from db
    const testMenu = await Menu.findOne({where: {name: 'Breakfast'}});
    expect(testMenu.entree).toBe('All Day Breakfast')
})

test('menus can have many menuItems', async()=> {
    //read test menu instance from db
    const testMenu = await Menu.findOne({where: {name: 'Breakfast'}});

    //create 2 test instances of Musician
    const testMenuItem1 = await MenuItem.findOne({where: {name: 'Chocolate Croissant'}})
    const testMenuItem2 = await MenuItem.findOne({where: {name: 'Big Breakfast w/ Hotcakes'}})

    //add test menuItems to test menu
    //magic sequelize add method
    await testMenu.addMenuItem(testMenuItem1)
    await testMenu.addMenuItem(testMenuItem2)

    //retrieve list of musicians in this band
    const menuItemList = await testMenu.getMenuItems()

    //assert that the list of musicians is length 2
    expect(menuItemList.length).toBe(2)
    
    //assert that the 0th index of the array musicianList is an instance of the model Musician
    expect(menuItemList[0] instanceof MenuItem).toBeTruthy()
    expect(menuItemList[0].name).toMatch('Chocolate Croissant')

})








})
