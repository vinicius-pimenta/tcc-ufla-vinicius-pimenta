import { validate } from 'uuid';
import { v4 as uuid } from 'uuid';

export default class UuidProvider {
  static isUuid(id: string): boolean {
    return validate(id);
  }

  static generate(): string {
    return uuid();
  }
}
