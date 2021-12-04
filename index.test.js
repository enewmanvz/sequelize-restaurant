//import the associated models from index.js
const {Menu, Restaurant, MenuItem, sequelize} = require('./index')

//test musician database CRUD
describe('Restaurant Database', () => {

    beforeAll(async() => {
        //reset database
        await sequelize.sync({force:true})
 
        //create array of restaurants
        const arrayOfRestaurant =[
            {name: 'McDonalds', cuisine: 'American'},
            {name: 'LaMadeleine', cuisine: 'French'}
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
            {name: 'Chicken Cobb Salad', price:7.99, calories: 950},
            {name: 'Chicken Pesto Pasta', price:12.99, calories: 985}
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
   test('can create a restaurant', async() => {
   //read test Menu instance from db
   const testRestaurant = await Restaurant.findOne({where: {name: 'McDonalds'}});
   expect(testRestaurant.cuisine).toBe('American')    
   })
   test('can create a restaurant', async() => {
   //read test Menu instance from db
   const testRestaurant = await Restaurant.findOne({where: {name: 'LaMadeleine'}});
   expect(testRestaurant.cuisine).toBe('French') 
    
   })
   test('can create a menu', async() => {
    //read test Menu instance from db
    const testMenu = await Menu.findOne({where: {name: 'Breakfast'}});
    expect(testMenu.entree).toBe('All Day Breakfast')

   })
   test('can create a menu', async() => {
   //read test Menu instance from db
   const testMenu = await Menu.findOne({where: {name: 'Lunch'}});
   expect(testMenu.entree).toBe('Lunch Classics')


})

test('menus can have many menuItems', async()=> {
    //read test menu instance from db
    const testMenu = await Menu.findOne({where: {name: 'Breakfast'}});
    //create 2 test instances of MenuItem
    const testMenuItem1 = await MenuItem.findOne({where: {name: 'Chocolate Croissant'}})
    const testMenuItem2 = await MenuItem.findOne({where: {name: 'Big Breakfast w/ Hotcakes'}})

    //add test menuItems to test menu
    //magic sequelize add method
    await testMenu.addMenuItem(testMenuItem1)
    await testMenu.addMenuItem(testMenuItem2)

    //retrieve list of menuItem in this menu
    const menuItemList = await testMenu.getMenuItems()

    //assert that the list of menuItems is length 2
    expect(menuItemList.length).toBe(2)   

    //assert that the 0th index of the array musicianList is an instance of the model Musician
    expect(menuItemList[0] instanceof MenuItem).toBeTruthy()
    expect(menuItemList[0].name).toMatch('Chocolate Croissant')
    expect(menuItemList[1].name).toMatch('Big Breakfast w/ Hotcakes') 
})

test('menus can have many menuItems', async()=> {
    const testMenu = await Menu.findOne({where: {name: 'Lunch'}});
    const testMenuItem1 = await MenuItem.findOne({where: {name: 'Chicken Cobb Salad'}})
    const testMenuItem2 = await MenuItem.findOne({where: {name: 'Chicken Pesto Pasta'}})
    //magic sequelize add method
    await testMenu.addMenuItem(testMenuItem1)
    await testMenu.addMenuItem(testMenuItem2)
    const menuItemList = await testMenu.getMenuItems()
    expect(menuItemList.length).toBe(2) 
    //assert that the 0th index of the array musicianList is an instance of the model Musician
    expect(menuItemList[0] instanceof MenuItem).toBeTruthy()
    expect(menuItemList[0].name).toMatch('Chicken Cobb Salad')
    expect(menuItemList[1].name).toMatch('Chicken Pesto Pasta') 
})

test('restaurant can have many menus', async()=> {
    const testRestaurant = await Restaurant.findOne({where: {name: 'McDonalds'}});
    const testMenu1 = await Menu.findOne({where: {name: 'Breakfast'}})
    const testMenu2 = await Menu.findOne({where: {name: 'Lunch'}})
    //magic sequelize add method
    await testRestaurant.addMenu(testMenu1)
    await testRestaurant.addMenu(testMenu2)
    const menuList = await testRestaurant.getMenu()
    expect(menuList.length).toBe(2) 
    //assert that the 0th index of the array menuList is an instance of the model Restaurant
    expect(menuList[0] instanceof Menu).toBeTruthy()
    expect(menuList[0].name).toMatch('Breakfast')
    expect(menuList[1].name).toMatch('Lunch') 
})





})
