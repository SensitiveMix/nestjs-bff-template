import { AllExceptionsFilter } from './any-exception.filter';

describe('HttpExceptionFilter', () => {
  it('should be defined', () => {
    expect(new AllExceptionsFilter()).toBeDefined();
  });
});
