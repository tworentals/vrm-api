const { TABLE_NAME } = require('../../src/models/v1/users/constants')

exports.up = (knex) => knex.schema.createTable(TABLE_NAME, (table) => {
  table.increments().unsigned().primary()
  table.integer('account_id').unsigned().notNull()
  table.string('oauth2_google_id').index()
  table.string('email').index().notNull()
  table.string('encrypted_password').notNull()
  table.string('phone_number', 40)
  table.string('first_name', 100)
  table.string('last_name', 100)
  table.boolean('is_account_owner').notNull().defaultTo(true)
  table.boolean('has_onboarding_enabled').notNull().defaultTo(true)
  table.integer('sign_in_count').unsigned().notNull().defaultTo(0)
  table.timestamp('current_sign_in_at')
  table.string('current_sign_in_ip', 30)
  table.timestamp('last_sign_in_at')
  table.string('last_sign_in_ip', 30)
  table.integer('failed_attempts').unsigned().notNull().defaultTo(0)
  table.timestamp('locked_at')
  table.timestamp('confirmed_at')
  table.timestamp('phone_number_verified_at')
  table.string('avatar')
  table.timestamp('created_at').notNull().defaultTo(knex.raw('CURRENT_TIMESTAMP'))
  table.timestamp('updated_at').notNull().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
  table.timestamp('deleted_at')

  table.foreign('account_id')
    .references('accounts.id')
    .onUpdate('CASCADE')
    .onDelete('CASCADE')
})

exports.down = (knex) => knex.schema.dropTable(TABLE_NAME)
