export class EmptySurvey extends Error {
  constructor() {
    super('The survey still has no answers');
  }
}
