import { dependency } from './dependency';

export class KlassWithDependency {
  someMethod() {
    return dependency();
  }
}
