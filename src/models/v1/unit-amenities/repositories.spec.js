const {
  select, insert, update, remove,
} = require('../../../services/database')
const { selectBy: selectDictAmenitites } = require('../dict-amenities/repositories')

jest.mock('../../../services/database')
jest.mock('../dict-amenities/repositories')

const repository = require('./repositories')

describe('unit-amenities repositories', () => {
  it('should upsert resource', async () => {
    const trx = 'trx'
    const propertyUnitTypeUnitId = 'propertyUnitTypeUnitId'
    const payload = [
      { dictAmenityId: '101', count: 2 },
      { dictAmenityId: '102', count: 4 },
      { dictAmenityId: '103', count: 6 },
      { dictAmenityId: '105', count: 6 },
    ]

    const amenities = [
      { id: 1, dictAmenityId: 101 },
      { id: 2, dictAmenityId: 201 },
    ]

    select.mockResolvedValue(amenities)
    selectDictAmenitites.mockResolvedValue([
      { id: 101 }, { id: 102 }, { id: 103 }, { id: 201 },
    ])
    remove.mockResolvedValue()
    insert.mockResolvedValue()

    await expect(repository.upsertBy(propertyUnitTypeUnitId, payload, trx))
      .resolves.toEqual([undefined, undefined, undefined, undefined])

    expect(select).toBeCalledWith('property_unit_type_unit_amenities', { propertyUnitTypeUnitId }, trx)
    expect(selectDictAmenitites).toBeCalled()
    expect(remove).toBeCalledWith('property_unit_type_unit_amenities', { id: 2 }, trx)
    expect(update).toBeCalledWith(
      'property_unit_type_unit_amenities',
      { dictAmenityId: '101', count: 2 },
      { propertyUnitTypeUnitId, dictAmenityId: '101' },
      trx,
    )
    expect(insert).toHaveBeenNthCalledWith(
      1, 'property_unit_type_unit_amenities', { propertyUnitTypeUnitId, dictAmenityId: '102', count: 4 }, trx,
    )
    expect(insert).toHaveBeenNthCalledWith(
      2, 'property_unit_type_unit_amenities', { propertyUnitTypeUnitId, dictAmenityId: '103', count: 6 }, trx,
    )
  })
})
