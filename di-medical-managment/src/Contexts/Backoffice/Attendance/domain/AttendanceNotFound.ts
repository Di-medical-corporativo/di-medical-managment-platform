export class AttendanceNotFound extends Error {
  constructor() {
    super('Issue not found');
  }
}
