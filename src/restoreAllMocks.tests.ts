import { KlassWithDependency } from './KlassWithDependency';

jest.mock('./dependency');
import { dependency } from './dependency';

/**
 * jest.restoreAllMocks()
 * Restores all mocks back to their original value.
 * Equivalent to calling .mockRestore() on every mocked function.
 * Beware that jest.restoreAllMocks() only works when the mock was created with jest.spyOn; other mocks will require you to manually restore them.
 */

describe('restoreAllMocks', () => {
  it('does nothing if the mock was not created with jest.spyOn', () => {
    const klass = new KlassWithDependency();
    expect(klass.someMethod()).toBe(undefined); // the underlying dependency is mocked

    (dependency as jest.Mock).mockReturnValue('mocked dependency');
    expect(klass.someMethod()).toBe('mocked dependency');

    jest.restoreAllMocks();
    expect(klass.someMethod()).toBe('mocked dependency'); // nothing has happened

    jest.restoreAllMocks();
    expect((dependency as jest.Mock).mock.calls.length).toBe(3); // all the calls are still there
  });
});
