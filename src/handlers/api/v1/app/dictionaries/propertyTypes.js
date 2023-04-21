const cache = require('../../../../../services/cacheManager')
const { handler } = require('../../../../../services/http')
const { selectBy } = require('../../../../../models/v1/dict-property-types/repositories')

module.exports = handler(async (req, res) => {
  const data = await cache.wrap('dictionaries.propertyTypes', cache.TTL.H2, () => (
    selectBy()
  ))

  return res.json({ data })
})
