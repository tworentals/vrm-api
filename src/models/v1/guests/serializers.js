const { serialize } = require('../../../services/serializers')

exports.PERMITED_COLLECTION_PARAMS = [
  'id',
  'companyId',
  'bookingId',
  'name',
  'type',
  'email',
  'phoneNumber',
  'gender',
  'title',
  'citizenship',
  'countryCode',
  'dateArrival',
  'amountTotal',
  'currency',
  'totalGuests',
  'totalNights',
  'firstName',
  'lastName',
  'labels',
  'notes',
  'createdAt',
  'updatedAt',
]

exports.PERMITED_ITEM_PARAMS = [
  'id',
  'companyId',
  'name',
  'type',
  'email',
  'phoneNumber',
  'gender',
  'title',
  'firstName',
  'lastName',
  'citizenship',
  'address',
  'city',
  'zip',
  'region',
  'countryCode',
  'documentType',
  'documentNumber',
  'documentIssuedDate',
  'documentExpiryDate',
  'birthDate',
  'birthPlace',
  'labels',
  'parlance',
  'notes',
  'createdAt',
  'updatedAt',
]

exports.serialize = serialize
