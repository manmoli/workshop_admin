import { HttpExceptionFilter } from './errors.filter'

describe('ErrorsFilter', () => {
  it('should be defined', () => {
    expect(new HttpExceptionFilter()).toBeDefined()
  })
})
