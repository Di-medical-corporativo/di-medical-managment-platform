export class IncidentNotFound extends Error {
  constructor() {
    super('Incident not found');
  }
}
