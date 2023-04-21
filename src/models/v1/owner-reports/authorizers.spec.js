const { checkModule } = require('../../../services/authorizers')

jest.mock('../../../services/authorizers')

const authorizer = require('./authorizers')

describe('owner-reports authorizers', () => {
  afterEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
  })

  it('should have a proper authorizer data', () => {
    expect(authorizer.module).toEqual([
      'account.module.owners.enabled', checkModule,
    ])
  })
})
