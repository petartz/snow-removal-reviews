/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.createTable("services", table =>{
        table.bigIncrements('id')
        table.string("name").notNullable()
        table.string("number")
        table.string("email")
        table.string("websiteUrl")
        table.string("photoUrl")
        table.text("description").notNullable()
        table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
        table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
    })
}

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
    return knex.schema.dropTableIfExists("services")
}
