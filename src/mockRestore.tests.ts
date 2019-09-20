import { Class } from './Class';

describe('mockClear', () => {
  it('removes interactions with the mock', () => {
    const mockedFunction = jest.fn();
    const originalMockObject = mockedFunction.mock;
    expect(mockedFunction.mock.calls).toEqual([]);

    mockedFunction('foo');
    mockedFunction('bar');
    expect(mockedFunction.mock.calls).toEqual([['foo'], ['bar']]);
    expect(mockedFunction.mock).toBe(originalMockObject);

    mockedFunction.mockReset();
    expect(mockedFunction.mock.calls).toEqual([]);
    expect(mockedFunction.mock).not.toBe(originalMockObject);
  });

  it('removes behaviour of the mock', () => {
    const mockedFunction = jest.fn(() => 'default');
    expect(mockedFunction()).toBe('default');

    mockedFunction.mockReturnValue('new value');
    expect(mockedFunction()).toBe('new value');
    expect(mockedFunction()).toBe('new value');

    mockedFunction.mockReset();
    expect(mockedFunction()).toBe(undefined);

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
