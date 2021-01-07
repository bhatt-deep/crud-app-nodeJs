exports.up = (knex, promise) => {
    return knex.schema.createTable('users', (table) => {
        table.uuid('id').primary()
        table.string('name').notNullable()
        table.string('password').notNullable()
        table.string('email').notNullable()
    })
}

exports.down = (knex, promise) => {
    return knex.schmea.dropTableIfExists('users')
}
