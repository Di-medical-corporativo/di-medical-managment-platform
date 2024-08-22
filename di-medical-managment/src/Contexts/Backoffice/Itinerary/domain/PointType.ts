import { StringValueObject } from "../../../Shared/domain/vo/StringValueObject";

export enum PointTypes {
  Route = 'point-route',
  Parcel = 'point-parcel',
  Collect = 'point-collect'
}

export class PointType extends StringValueObject {}
