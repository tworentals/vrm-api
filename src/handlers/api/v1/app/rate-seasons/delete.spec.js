const createError = require('../../../../../services/errors')
const { handler } = require('../../../../../services/http')
const { selectOneBy, deleteBy } = require('../../../../../models/v1/rate-seasons/repositories')

jest.mock('../../../../../services/errors')
jest.mock('../../../../../services/http')
jest.mock('../../../../../models/v1/rate-seasons/repositories')

const httpHandler = require('./delete')

describe('DELETE /v1/app/rate-seasons', () => {
  const accountId = 'accountId'
  const id = 'id'

  afterEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
  })

  it('should delete a resource', async () => {
    const statusCode = 204

    const rate = { id }

    const sendStatus = jest.fn().mockImplementation((args) => args)

    selectOneBy.mockResolvedValue(rate)

    await expect(httpHandler({ user: { accountId }, params: { id } }, { sendStatus })).resolves.toEqual(statusCode)

    expect(handler).toBeCalled()
    expect(selectOneBy).toBeCalledWith({ accountId, id })
    expect(deleteBy).toBeCalledWith({ id: rate.id })
    expect(sendStatus).toBeCalledWith(statusCode)
  })

  it('should throw an error when resource does not exists', async () => {
    const errorMessage = 'Not Found'

    createError.mockImplementation(() => {
      throw new Error(errorMessage)
    })

    selectOneBy.mockResolvedValue(null)
    await expect(httpHandler({ user: { accountId }, params: { id } })).rejects.toThrow(errorMessage)

    expect(selectOneBy).toBeCalledWith({ accountId, id })
    expect(createError).toBeCalledWith(404, errorMessage, { code: 'NOT_FOUND' })
  })
})
