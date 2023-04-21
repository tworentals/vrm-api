const { serialize } = require('../../../services/serializers')

exports.PERMITED_COLLECTION_PARAMS = [
  'id',
  'websiteId',
  'name',
  'createdAt',
  'updatedAt',
]

exports.PERMITED_ITEM_PARAMS = exports.PERMITED_COLLECTION_PARAMS

exports.serialize = serialize
