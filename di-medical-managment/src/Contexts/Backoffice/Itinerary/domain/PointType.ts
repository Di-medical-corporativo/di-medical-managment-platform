import { StringValueObject } from "../../../Shared/domain/vo/StringValueObject";

export enum PointTypes {
  Route = 'point-route',
  Parcel = 'point-parcel',
  Collect = 'point-collect'
}

export const pointTypes = [
  PointTypes.Collect,
  PointTypes.Parcel,
  PointTypes.Route
];

export class PointType extends StringValueObject {
  isRoute() {
    if(this.value === PointTypes.Route) {
      return true;
    }
    return false
  }

  isParcel(){
    if(this.value === PointTypes.Parcel) {
      return true;
    }

    return false;
  }

  isCollect() {
    if(this.value === PointTypes.Collect) {
      return true;
    }

    return false;
  }
}
