export class SurveyClosed extends Error {
  constructor() {
    super('Survey is currently closed');
  }
}
