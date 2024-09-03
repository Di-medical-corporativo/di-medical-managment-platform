import { StringValueObject } from "../../../Shared/domain/vo/StringValueObject";

export class ItinerarySchedule extends StringValueObject {
  public format() {
    const date = new Date(this.value);

    const mexicanFormat = new Intl.DateTimeFormat('es-MX', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);

    return mexicanFormat;
  }
}
