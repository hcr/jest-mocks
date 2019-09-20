import { Class } from './Class';

/**
 * mockFn.mockRestore()
 * Does everything that mockFn.mockReset() does, and also restores the original (non-mocked) implementation.
 * This is useful when you want to mock functions in certain test cases and restore the original implementation in others.
 * Beware that mockFn.mockRestore only works when the mock was created with jest.spyOn. Thus you have to take care of restoration yourself when manually assigning jest.fn().
 * The restoreMocks configuration option is available to restore mocks automatically between tests.
 */

describe('mockRestore', () => {
  it('removes interactions with the mock', () => {
    const mockedFunction = jest.fn();
    const originalMockObject = mockedFunction.mock;
    expect(mockedFunction.mock.calls).toEqual([]);

    mockedFunction('foo');
    mockedFunction('bar');
    expect(mockedFunction.mock.calls).toEqual([['foo'], ['bar']]);
    expect(mockedFunction.mock).toBe(originalMockObject);

    mockedFunction.mockRestore();
    expect(mockedFunction.mock.calls).toEqual([]); // the previous calls to the mock are gone
    expect(mockedFunction.mock).not.toBe(originalMockObject); // the mock object has been replaced
  });

  it('removes behaviour of the mock', () => {
    const mockedFunction = jest.fn(() => 'default');
    expect(mockedFunction()).toBe('default');

    mockedFunction.mockReturnValue('new value');
    expect(mockedFunction()).toBe('new value');
    expect(mockedFunction()).toBe('new value');

    mockedFunction.mockRestore();
    expect(mockedFunction()).toBe(undefined); // mockRestore has removed the mocked implementation

    mockedFunction.mockReturnValueOnce('even newer value');
    expect(mockedFunction()).toBe('even newer value');
    expect(mockedFunction()).toBe(undefined);
  });

  it('restores the initial implementation of a spy', () => {
    const klass = new Class();
    jest.spyOn(klass, 'originalMethod');
    expect(klass.originalMethod()).toBe('original');
    expect((klass.originalMethod as jest.Mock).mock).not.toBe(undefined); // the method is a mock

    (klass.originalMethod as jest.Mock).mockReturnValue('new value');
    expect(klass.originalMethod()).toBe('new value');
    expect(klass.originalMethod()).toBe('new value');

    (klass.originalMethod as jest.Mock).mockRestore();
    expect(klass.originalMethod()).toBe('original');
    expect((klass.originalMethod as jest.Mock).mock).toBe(undefined); // the method is no longer a mock
  });
});
