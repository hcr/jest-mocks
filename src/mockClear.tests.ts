import { Class } from './Class';

/**
 * mockFn.mockClear()
 * Resets all information stored in the mockFn.mock.calls and mockFn.mock.instances arrays.
 * Often this is useful when you want to clean up a mock's usage data between two assertions.
 * Beware that mockClear will replace mockFn.mock, not just mockFn.mock.calls and mockFn.mock.instances. You should therefore avoid assigning mockFn.mock to other variables, temporary or not, to make sure you don't access stale data.
 * The clearMocks configuration option is available to clear mocks automatically between tests.
 */

describe('mockClear', () => {
  it('removes interactions with the mock', () => {
    const mockedFunction = jest.fn();
    const originalMockObject = mockedFunction.mock;
    expect(mockedFunction.mock.calls).toEqual([]);

    mockedFunction('foo');
    mockedFunction('bar');
    expect(mockedFunction.mock.calls).toEqual([['foo'], ['bar']]);
    expect(mockedFunction.mock).toBe(originalMockObject);

    mockedFunction.mockClear();
    expect(mockedFunction.mock.calls).toEqual([]); // the previous calls to the mock are gone
    expect(mockedFunction.mock).not.toBe(originalMockObject); // the mock object has been replaced
  });

  it('does not change behaviour of the mock', () => {
    const mockedFunction = jest.fn(() => 'default');
    expect(mockedFunction()).toBe('default');

    mockedFunction.mockReturnValue('new value');
    expect(mockedFunction()).toBe('new value');
    expect(mockedFunction()).toBe('new value');

    mockedFunction.mockClear();
    expect(mockedFunction()).toBe('new value'); // mockClear has not removed the mocked implementation

    mockedFunction.mockReturnValueOnce('even newer value');
    expect(mockedFunction()).toBe('even newer value');
    expect(mockedFunction()).toBe('new value'); // mockClear has not removed the mocked implementation

    mockedFunction.mockReturnValueOnce('even newer value');
    mockedFunction.mockClear();
    expect(mockedFunction()).toBe('even newer value'); // mockClear has not removed the mocked implementation
    expect(mockedFunction()).toBe('new value');
  });

  it('retains a spy as a mock', () => {
    const klass = new Class();
    jest.spyOn(klass, 'originalMethod');
    expect(klass.originalMethod()).toBe('original');
    expect((klass.originalMethod as jest.Mock).mock).not.toBe(undefined); // the method is a mock

    (klass.originalMethod as jest.Mock).mockReturnValue('new value');
    expect(klass.originalMethod()).toBe('new value');
    expect(klass.originalMethod()).toBe('new value');

    (klass.originalMethod as jest.Mock).mockClear();
    expect(klass.originalMethod()).toBe('new value');
    expect((klass.originalMethod as jest.Mock).mock).not.toBe(undefined); // the method is still a mock
  });
});
