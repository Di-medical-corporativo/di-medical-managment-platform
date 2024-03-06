import { v4 as uuid } from 'uuid';
import { ValueObject } from './ValueObject';

export class Uuid extends ValueObject<string> {
  constructor(value: string) {
    super(value)
  }

  toString(): string {
    return this.value.toString()
  }

  static random(): Uuid {
    return new Uuid(uuid())
  }
}
