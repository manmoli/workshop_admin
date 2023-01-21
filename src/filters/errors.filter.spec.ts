import { TypeORMErrorFilter } from './errors.filter'

describe('ErrorsFilter', () => {
  it('should be defined', () => {
    expect(new TypeORMErrorFilter()).toBeDefined()
  })
})
