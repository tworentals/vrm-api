const { handler } = require('../../../../../services/http')
const { selectBy } = require('../../../../../models/v1/fees/repositories')
const { PERMITED_COLLECTION_PARAMS, serialize } = require('../../../../../models/v1/fees/serializers')

module.exports = handler(async ({ user: { accountId } }, res) => {
  const data = await selectBy({ accountId })
    .then((results) => serialize(PERMITED_COLLECTION_PARAMS, results))

  return res.json({ data })
})
