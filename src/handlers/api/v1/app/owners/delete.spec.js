const createError = require('../../../../../services/errors')
const { handler } = require('../../../../../services/http')
const { deleteFiles } = require('../../../../../services/s3')
const { selectOneBy, deleteBy } = require('../../../../../models/v1/owners/repositories')

jest.mock('../../../../../services/errors')
jest.mock('../../../../../services/http')
jest.mock('../../../../../services/s3')
jest.mock('../../../../../models/v1/owners/repositories')

const httpHandler = require('./delete')

describe('DELETE /v1/app/owners/:id', () => {
  const id = 1
  const accountId = 100

  afterEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
  })

  it('should delete a resource', async () => {
    const avatar = 'avatar/s3/path'
    const statusCode = 204

    const sendStatus = jest.fn().mockImplementation((args) => args)

    deleteBy.mockResolvedValue()
    selectOneBy.mockResolvedValue({ id, avatar })

    await expect(httpHandler({ user: { accountId }, params: { id } }, { sendStatus }))
      .resolves.toBe(statusCode)

    expect(handler).toBeCalled()
    expect(selectOneBy).toBeCalledWith({ id, accountId })
    expect(deleteFiles).toBeCalledWith([avatar])
    expect(deleteBy).toBeCalledWith({ accountId, id })
    expect(sendStatus).toBeCalledWith(statusCode)
  })

  it('should throw an error if owner does not exists', async () => {
    const errorMessage = 'Not Found'

    createError.mockImplementation(() => {
      throw new Error(errorMessage)
    })

    selectOneBy.mockResolvedValue(null)

    await expect(httpHandler({ user: { accountId }, params: { id } }))
      .rejects.toThrow(errorMessage)

    expect(selectOneBy).toBeCalledWith({ id, accountId })
    expect(createError).toBeCalledWith(404, errorMessage, { code: 'NOT_FOUND' })
  })
})
