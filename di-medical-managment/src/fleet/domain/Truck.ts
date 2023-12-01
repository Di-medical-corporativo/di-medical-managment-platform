import { Incident } from './Incident'

export class Truck {
  private _incidents: Incident[] = []
  constructor (
    private _truckId: string | undefined,
    private _plates: string,
    private _model: string,
    private _brand: string,
    private _picture: string,
    private _isActive: boolean
  ) {}

  get truckId (): string | undefined {
    return this._truckId
  }

  set truckId (value: string) {
    this._truckId = value
  }

  get plates (): string {
    return this._plates
  }

  set plates (value: string) {
    this._plates = value
  }

  get model (): string {
    return this._model
  }

  set model (value: string) {
    this._model = value
  }

  get brand (): string {
    return this._brand
  }

  set brand (value: string) {
    this._brand = value
  }

  get picture (): string {
    return this._picture
  }

  set picture (value: string) {
    this._picture = value
  }

  get incidents() {
    return this._incidents
  }

  set incidents(incidents: Incident[]) {
    this._incidents = incidents
  }

  get isActive() {
    return this._isActive
  }

  set isActive(status: boolean) {
    this._isActive = status
  }

  removeIncident(incident: Incident) {
    this.incidents.map((incidentToFind) => {
      if(incidentToFind.incidentId == incident.incidentId){
        incidentToFind.isActive = false
      }
    })
  }

}
