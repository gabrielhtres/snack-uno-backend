const { default: knex } = require('knex');
const db = require('../../../db')
const product = require('../../../routes/product')

;(async () => {
  try {
    // await db.schema.dropTableIfExists('users')
    // await db.schema.withSchema('public').createTable('users', (table) => {
    //   table.increments()
    //   table.string('name')
    // })
    // console.log('Created users table!')

    data = { id: 1, name: 'Product 1', price: 100, description: 'Description 1' , stock: 10, image: 'https://picsum.photos/200/300' }

    product.post(data)

    
    // insert data into table product
    await db.table('product').insert(data)

    process.exit(0)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
})