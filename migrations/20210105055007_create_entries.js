exports.up = (knex, promise) => {
    return knex.schema.createTable('entries', (table) => {
        table.uuid('id').primary()
        table.string('name').notNullable()
        table.string('email').notNullable()
        table.string('phoneNumber').notNullable()
        table.string('content').notNullable()
    })
}

exports.down = (knex, promise) => {
    return knex.schmea.dropTableIfExists('entries')
}
