import { KlassWithDependency } from './KlassWithDependency';

jest.mock('./dependency');
import { dependency } from './dependency';

/**
 * jest.resetAllMocks()
 * Resets the state of all mocks. Equivalent to calling .mockReset() on every mocked function.
 * Returns the jest object for chaining.
 */

describe('resetAllMocks', () => {
  it('behaves the same as mockReset', () => {
    const klass = new KlassWithDependency();
    expect(klass.someMethod()).toBe(undefined); // the underlying dependency is mocked

    (dependency as jest.Mock).mockReturnValue('mocked dependency');
    expect(klass.someMethod()).toBe('mocked dependency');

    jest.resetAllMocks();
    expect(klass.someMethod()).toBe(undefined); // the underlying dependency is still mocked but the mock implementation is gone

    jest.resetAllMocks();
    expect((dependency as jest.Mock).mock.calls.length).toBe(0); // all the calls are gone
  });
});
