const createError = require('../../../../../services/errors')
const { CODES, MESSAGES } = require('../../../../../services/errorCodes')
const { handler } = require('../../../../../services/http')
const { validate } = require('../../../../../services/validate')
const {
  updateBy,
  selectOneBy,
  isCompleted,
} = require('../../../../../models/v1/rate-seasons/repositories')
const { UPDATE_SCHEMA } = require('../../../../../models/v1/rate-seasons/schema')

module.exports = handler(async ({ user: { accountId }, params: { id }, body }, res) => {
  const payload = await validate(body, { schema: UPDATE_SCHEMA })

  const rate = await selectOneBy({ accountId, id })

  if (!rate) {
    throw createError(404, MESSAGES.NOT_FOUND, { code: CODES.NOT_FOUND })
  }

  await updateBy({ id: rate.id }, {
    ...payload,
    isCompleted: isCompleted({ ...rate, ...payload }),
  })

  return res.sendStatus(200)
})
