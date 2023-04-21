const {
  TABLE_NAME, RATE_TYPES, CHARGE_TYPE, FREQUENCIES,
} = require('../../src/models/v1/taxes/constants')

exports.up = (knex) => knex.schema.createTable(TABLE_NAME, (table) => {
  table.increments().unsigned().primary()
  table.integer('account_id').unsigned().notNull()
  table.string('name').notNull()
  table.enum('rate_type', Object.values(RATE_TYPES)).notNull()
  table.decimal('percentage', 5, 2).unsigned()
  table.string('currency', 3)
  table.decimal('amount', 10, 2)
  table.enum('charge_type', Object.values(CHARGE_TYPE))
  table.enum('frequency', Object.values(FREQUENCIES))
  table.text('description')
  table.timestamp('created_at').notNull().defaultTo(knex.raw('CURRENT_TIMESTAMP'))
  table.timestamp('updated_at').notNull().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))

  table.foreign('account_id')
    .references('accounts.id')
    .onUpdate('CASCADE')
    .onDelete('CASCADE')
})

exports.down = (knex) => knex.schema.dropTable(TABLE_NAME)
