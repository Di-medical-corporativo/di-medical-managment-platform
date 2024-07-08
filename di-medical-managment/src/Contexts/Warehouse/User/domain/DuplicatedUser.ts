export class DuplicatedUser extends Error {
  constructor() {
    super('Email or id already exists');
  }
}
