import { Incident } from '@prisma/client'
import { Incident as DomainIncident } from '../../domain/Incident'

export class ModelToDomainIncidents {
  public static from(incidents: Incident[] = []) {
    const domainIncidents: DomainIncident[] = incidents.map( incident => {
      const incidentToCreate = new DomainIncident(
        incident.id,
        incident.description,
        incident.picture,
        incident.isActive,
        incident.startDate
      )
      incidentToCreate.finishDate = incident.finishedDate
      return incidentToCreate
    })

    return domainIncidents
  }

  public static fromSingle(incident: Incident) {
    const domainIncident: DomainIncident = new DomainIncident(
      incident.id,
      incident.description,
      incident.picture,
      incident.isActive,
      incident.startDate
    )
    domainIncident.finishDate = incident.finishedDate
    return domainIncident
  }
} 
