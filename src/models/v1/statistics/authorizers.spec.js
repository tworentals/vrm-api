const { checkModule } = require('../../../services/authorizers')

jest.mock('../../../services/authorizers')

const authorizer = require('./authorizers')

describe('statistics authorizers', () => {
  it('should have a proper authorizer data', () => {
    expect(authorizer.module).toEqual([
      'account.module.statistics.enabled', checkModule,
    ])
  })
})
