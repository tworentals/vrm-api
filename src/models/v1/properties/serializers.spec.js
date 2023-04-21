const { serialize } = require('../../../services/serializers')

jest.mock('../../../services/serializers')

const serializers = require('./serializers')

describe('properties serializers', () => {
  const data = 'data'
  const results = 'results'

  it('should serialize item params', async () => {
    serialize.mockReturnValue(results)

    expect(serializers.serialize(serializers.PERMITED_ITEM_PARAMS, data)).toEqual(results)

    expect(serialize).toBeCalledWith([
      'id',
      'workspaceId',
      'dictPropertyTypeId',
      'name',
      'internalCode',
      'registrationNumber',
      'isAddressPublic',
      'isCompleted',
      'multipleUnitTypes',
      'checkinTime',
      'checkoutTime',
      'languages',
      'address',
      'coordinates',
      'distances',
      'directions',
      'description',
      'amenities',
      'completeness',
      'mainImage',
      'createdAt',
      'updatedAt',
    ], data)
  })

  it('should serialize collection item params', async () => {
    serialize.mockReturnValue(results)

    expect(serializers.serialize(serializers.PERMITED_COLLECTION_PARAMS, data)).toEqual(results)

    expect(serialize).toBeCalledWith([
      'id',
      'workspaceId',
      'dictPropertyTypeId',
      'name',
      'internalCode',
      'registrationNumber',
      'isAddressPublic',
      'isCompleted',
      'multipleUnitTypes',
      'checkinTime',
      'checkoutTime',
      'languages',
      'address',
      'coordinates',
      'distances',
      'directions',
      'description',
      'mainImage',
      'createdAt',
      'updatedAt',
    ], data)
  })
})
