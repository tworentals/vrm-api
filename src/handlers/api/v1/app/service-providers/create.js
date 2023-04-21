const createError = require('../../../../../services/errors')
const { CODES, MESSAGES } = require('../../../../../services/errorCodes')
const { handler } = require('../../../../../services/http')
const { validate } = require('../../../../../services/validate')
const { create, selectOneBy } = require('../../../../../models/v1/service-providers/repositories')
const { CREATE_SCHEMA } = require('../../../../../models/v1/service-providers/schema')

module.exports = handler(async ({ user: { accountId }, body }, res) => {
  const payload = await validate(body, { schema: CREATE_SCHEMA })

  if (await selectOneBy({ accountId, name: payload.name })) {
    throw createError(400, MESSAGES.VALIDATION_FAILED, {
      code: CODES.VALIDATION_FAILED,
      errors: { name: ['unique'] },
    })
  }

  const id = await create({ ...payload, accountId })

  return res.json({ data: { id } })
})
