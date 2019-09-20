import { KlassWithDependency } from './KlassWithDependency';

jest.mock('./dependency');
import { dependency } from './dependency';

/**
 * jest.clearAllMocks()
 * Clears the mock.calls and mock.instances properties of all mocks. Equivalent to calling .mockClear() on every mocked function.
 * Returns the jest object for chaining.
 */

describe('clearAllMocks', () => {
  it('behaves the same as mockClear', () => {
    const klass = new KlassWithDependency();
    expect(klass.someMethod()).toBe(undefined); // the underlying dependency is mocked

    (dependency as jest.Mock).mockReturnValue('mocked dependency');
    expect(klass.someMethod()).toBe('mocked dependency');

    jest.clearAllMocks();
    expect(klass.someMethod()).toBe('mocked dependency'); // the underlying dependency is still mocked and uses the mocked return

    jest.clearAllMocks();
    expect((dependency as jest.Mock).mock.calls.length).toBe(0); // all the calls are gone
  });
});
