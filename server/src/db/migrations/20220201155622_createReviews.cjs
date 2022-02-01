/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.createTable('reviews', (table) => {
        table.bigIncrements('id')
        table.string('heading').notNullable()
        table.string('description')
        table.integer('rating').notNullable()
        table.bigInteger('userId')
            .notNullable()
            .unsigned()
            .index()
            .references('users.id')
        table.bigInteger('serviceId')
            .notNullable()
            .unsigned()
            .index()
            .references('services.id')
        table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now())
        table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now())
    })
}

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
    return knex.schema.dropTableIfExists('reviews')
}
