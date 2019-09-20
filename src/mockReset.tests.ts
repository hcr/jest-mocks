import { Class } from './Class';

/**
 * mockFn.mockReset()
 * Does everything that mockFn.mockClear() does, and also removes any mocked return values or implementations.
 * This is useful when you want to completely reset a mock back to its initial state. (Note that resetting a spy will result in a function with no return value).
 * Beware that mockReset will replace mockFn.mock, not just mockFn.mock.calls and mockFn.mock.instances. You should therefore avoid assigning mockFn.mock to other variables, temporary or not, to make sure you don't access stale data.
 */

describe('mockReset', () => {
  it('removes interactions with the mock', () => {
    const mockedFunction = jest.fn();
    const originalMockObject = mockedFunction.mock;
    expect(mockedFunction.mock.calls).toEqual([]);

    mockedFunction('foo');
    mockedFunction('bar');
    expect(mockedFunction.mock.calls).toEqual([['foo'], ['bar']]);
    expect(mockedFunction.mock).toBe(originalMockObject);

    mockedFunction.mockReset();
    expect(mockedFunction.mock.calls).toEqual([]); // the previous calls to the mock are gone
    expect(mockedFunction.mock).not.toBe(originalMockObject); // the mock object has been replaced
  });

  it('removes behaviour of the mock', () => {
    const mockedFunction = jest.fn(() => 'default');
    expect(mockedFunction()).toBe('default');

    mockedFunction.mockReturnValue('new value');
    expect(mockedFunction()).toBe('new value');
    expect(mockedFunction()).toBe('new value');

    mockedFunction.mockReset();
    expect(mockedFunction()).toBe(undefined); // mockReset has removed the mocked implementation

    mockedFunction.mockReturnValueOnce('even newer value');
    expect(mockedFunction()).toBe('even newer value');
    expect(mockedFunction()).toBe(undefined);
  });

  it('retains a spy as a mock', () => {
    const klass = new Class();
    jest.spyOn(klass, 'originalMethod');
    expect(klass.originalMethod()).toBe('original');
    expect((klass.originalMethod as jest.Mock).mock).not.toBe(undefined); // the method is a mock

    (klass.originalMethod as jest.Mock).mockReturnValue('new value');
    expect(klass.originalMethod()).toBe('new value');
    expect(klass.originalMethod()).toBe('new value');

    (klass.originalMethod as jest.Mock).mockReset();
    expect(klass.originalMethod()).toBe(undefined);
    expect((klass.originalMethod as jest.Mock).mock).not.toBe(undefined); // the method is still a mock
  });
});
