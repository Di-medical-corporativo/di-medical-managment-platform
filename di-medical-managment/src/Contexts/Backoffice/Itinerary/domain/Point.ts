import { StatusList } from "../../Task/domain/TaskStatus";
import { Invoice } from "./Invoice";
import { ItineraryId } from "./ItineraryId";
import { PointCertificate } from "./PointCertificate";
import { PointClient } from "./PointClient";
import { PointComment } from "./PointComment";
import { PointId } from "./PointId";
import { PointObservation } from "./PointObservation";
import { PointProblem } from "./PointProblem";
import { PointSSA } from "./PointSSA";
import { PointStatus } from "./PointStatus";
import { PointSurvey } from "./PointSurvey";
import { PointTask } from "./PointTask";
import { PointType, PointTypes } from "./PointType";
import { PointUser } from "./PointUser";

export abstract class Point { 
  constructor(
    protected id: PointId,
    protected itineraryId: ItineraryId,
    protected client: PointClient,
    protected userAssigned: PointUser,
    protected invoce: Invoice[],
    protected comment: PointComment,
    protected observation: PointObservation,
    protected certificate: PointCertificate,
    protected ssa: PointSSA,
    protected status: PointStatus,
    protected task: PointTask,
    protected hasProblem: PointProblem 
  ) {}

  public isFinished() {
    return this.status.isDone();
  }

  public finishedWithProblems() {
    return this.status.hasProblem();
  } 

  public end(comment: PointComment, hasProblem: PointProblem) {
    this.comment = comment;
    this.hasProblem = hasProblem;

    this.status = new PointStatus(StatusList.Completed);
  }

  public pointWithProblem () {
    return this.hasProblem.value;
  }

  public updateClient(client: PointClient) {
    this.client = client;
  }

  public updateUserAssigned(user: PointUser) {
    this.userAssigned = user;
  }

  public updateInvoices(invoices: Invoice[]) {
    this.invoce = invoices;
  }

  public updateObservation(observation: PointObservation) {
    this.observation = observation;
  }

  public updateCertificate(certificate: PointCertificate) {
    this.certificate = certificate;
  }

  public updateSSA(ssa: PointSSA) {
    this.ssa = ssa;
  }
  
  abstract toPrimitives(): any;
}

export class RoutePoint extends Point{
  private type: PointType = new PointType(PointTypes.Route);

  constructor(
    id: PointId,
    itineraryId: ItineraryId,
    client: PointClient,
    userAssigned: PointUser,
    invoice: Invoice[],
    comment: PointComment,
    observation: PointObservation,
    certificate: PointCertificate,
    ssa: PointSSA,
    status: PointStatus,
    task: PointTask,
    hasProblem: PointProblem,
    private survey: PointSurvey
  ) {
    super(
      id, 
      itineraryId, 
      client, 
      userAssigned, 
      invoice, 
      comment, 
      observation, 
      certificate,
      ssa,
      status,
      task,
      hasProblem
    );
  }

  static create(params: {
    id: PointId,
    itineraryId: ItineraryId,
    client: PointClient,
    userAssigned: PointUser,
    invoice: Invoice[],
    comment: PointComment,
    observation: PointObservation,
    certificate: PointCertificate,
    ssa: PointSSA,
    status: PointStatus,
    task: PointTask,
    survey: PointSurvey
  }) {
    return new RoutePoint(
      params.id,
      params.itineraryId,
      params.client,
      params.userAssigned,
      params.invoice,
      params.comment,
      params.observation,
      params.certificate,
      params.ssa,
      params.status,
      params.task,
      new PointProblem(false),
      params.survey
    );
  }

  static fromPrimitives(params: {
    id: string;
    itineraryId: string;
    client: {
      id: string;
      name: string
    };
    userAssigned: {
      id: string;
      firstName: string;
      lastName: string;
    };
    invoice: {
      id: string;
      number: string
    }[];
    comment: string;
    observation: string;
    certificate: string;
    ssa: string;
    status: string;
    task: {
      id: string;
      status: string;
    };
    hasProblem: boolean;
    survey: {
      id: string;
      title: string;
    }
  }) {
    return new RoutePoint(
      new PointId(params.id),
      new ItineraryId(params.itineraryId),
      PointClient.fromPrimitives(params.client),
      PointUser.fromPrimitives(params.userAssigned),
      params.invoice.map(i => Invoice.fromPrimitives(i)),
      new PointComment(params.comment),
      new PointObservation(params.observation),
      new PointCertificate(params.certificate),
      new PointSSA(params.ssa),
      new PointStatus(params.status),
      PointTask.fromPrimitives(params.task),
      new PointProblem(params.hasProblem),
      PointSurvey.fromPrimitives(params.survey)
    );
  }

  toPrimitives() {
    return {
      id: this.id.toString(),
      itineraryId: this.itineraryId.toString(),
      client: this.client.toPrimitives(),
      userAssigned: this.userAssigned.toPrimitives(),
      invoice: this.invoce.map(i => i.toPrimitives()),
      comment: this.comment.toString(),
      observation: this.observation.toString(),
      certificate: this.certificate.toString(),
      ssa: this.ssa.toString(),
      status: this.status.toString(),
      survey: this.survey.toPrimitives(),
      type: this.type.toString(),
      task: this.task.toPrimitives(),
      hasProblem: this.hasProblem.value
    }
  }
}

export class ParcelPoint extends Point{
  private type: PointType = new PointType(PointTypes.Parcel);

  constructor(
    id: PointId,
    itineraryId: ItineraryId,
    client: PointClient,
    userAssigned: PointUser,
    invoice: Invoice[],
    comment: PointComment,
    observation: PointObservation,
    certificate: PointCertificate,
    ssa: PointSSA,
    status: PointStatus,
    task: PointTask,
    hasProblem: PointProblem,
  ) {
    super(
      id, 
      itineraryId, 
      client, 
      userAssigned, 
      invoice, 
      comment, 
      observation, 
      certificate,
      ssa,
      status,
      task,
      hasProblem
    );
  }

  static create(params: {
    id: PointId,
    itineraryId: ItineraryId,
    client: PointClient,
    userAssigned: PointUser,
    invoice: Invoice[],
    comment: PointComment,
    observation: PointObservation,
    certificate: PointCertificate,
    ssa: PointSSA,
    status: PointStatus,
    task: PointTask
  }) {
    return new ParcelPoint(
      params.id,
      params.itineraryId,
      params.client,
      params.userAssigned,
      params.invoice,
      params.comment,
      params.observation,
      params.certificate,
      params.ssa,
      params.status,
      params.task,
      new PointProblem(false),
    );
  }

  static fromPrimitives(params: {
    id: string;
    itineraryId: string;
    client: {
      id: string;
      name: string
    };
    userAssigned: {
      id: string;
      firstName: string;
      lastName: string;
    };
    invoice: {
      id: string;
      number: string
    }[];
    comment: string;
    observation: string;
    certificate: string;
    ssa: string;
    status: string;
    task: {
      id: string;
      status: string;
    };
    hasProblem: boolean;
  }) {
    return new ParcelPoint(
      new PointId(params.id),
      new ItineraryId(params.itineraryId),
      PointClient.fromPrimitives(params.client),
      PointUser.fromPrimitives(params.userAssigned),
      params.invoice.map(i => Invoice.fromPrimitives(i)),
      new PointComment(params.comment),
      new PointObservation(params.observation),
      new PointCertificate(params.certificate),
      new PointSSA(params.ssa),
      new PointStatus(params.status),
      PointTask.fromPrimitives(params.task),
      new PointProblem(params.hasProblem),
    );
  }

  toPrimitives() {
    return {
      id: this.id.toString(),
      itineraryId: this.itineraryId.toString(),
      client: this.client.toPrimitives(),
      userAssigned: this.userAssigned.toPrimitives(),
      invoice: this.invoce.map(i => i.toPrimitives()),
      comment: this.comment.toString(),
      observation: this.observation.toString(),
      certificate: this.certificate.toString(),
      ssa: this.ssa.toString(),
      status: this.status.toString(),
      type: this.type.toString(),
      task: this.task.toPrimitives(),
      hasProblem: this.hasProblem.value
    }
  }
}

export class CollectPoint extends Point{
  private type: PointType = new PointType(PointTypes.Collect);

  constructor(
    id: PointId,
    itineraryId: ItineraryId,
    client: PointClient,
    userAssigned: PointUser,
    invoice: Invoice[],
    comment: PointComment,
    observation: PointObservation,
    certificate: PointCertificate,
    ssa: PointSSA,
    status: PointStatus,
    task: PointTask,
    hasProblem: PointProblem,
    private survey: PointSurvey
  ) {
    super(
      id, 
      itineraryId, 
      client, 
      userAssigned, 
      invoice, 
      comment, 
      observation, 
      certificate,
      ssa,
      status,
      task,
      hasProblem
    );
  }

  static create(params: {
    id: PointId,
    itineraryId: ItineraryId,
    client: PointClient,
    userAssigned: PointUser,
    invoice: Invoice[],
    comment: PointComment,
    observation: PointObservation,
    certificate: PointCertificate,
    ssa: PointSSA,
    status: PointStatus,
    task: PointTask,
    survey: PointSurvey
  }) {
    return new CollectPoint(
      params.id,
      params.itineraryId,
      params.client,
      params.userAssigned,
      params.invoice,
      params.comment,
      params.observation,
      params.certificate,
      params.ssa,
      params.status,
      params.task,
      new PointProblem(false),
      params.survey
    );
  }

  static fromPrimitives(params: {
    id: string;
    itineraryId: string;
    client: {
      id: string;
      name: string
    };
    userAssigned: {
      id: string;
      firstName: string;
      lastName: string;
    };
    invoice: {
      id: string;
      number: string
    }[];
    comment: string;
    observation: string;
    certificate: string;
    ssa: string;
    status: string;
    task: {
      id: string;
      status: string;
    };
    hasProblem: boolean;
    survey: {
      id: string;
      title: string;
    }
  }) {
    return new CollectPoint(
      new PointId(params.id),
      new ItineraryId(params.itineraryId),
      PointClient.fromPrimitives(params.client),
      PointUser.fromPrimitives(params.userAssigned),
      params.invoice.map(i => Invoice.fromPrimitives(i)),
      new PointComment(params.comment),
      new PointObservation(params.observation),
      new PointCertificate(params.certificate),
      new PointSSA(params.ssa),
      new PointStatus(params.status),
      PointTask.fromPrimitives(params.task),
      new PointProblem(params.hasProblem),
      PointSurvey.fromPrimitives(params.survey)
    );
  }


  toPrimitives() {
    return {
      id: this.id.toString(),
      itineraryId: this.itineraryId.toString(),
      client: this.client.toPrimitives(),
      userAssigned: this.userAssigned.toPrimitives(),
      invoice: this.invoce.map(i => i.toPrimitives()),
      comment: this.comment.toString(),
      observation: this.observation.toString(),
      certificate: this.certificate.toString(),
      ssa: this.ssa.toString(),
      status: this.status.toString(),
      type: this.type.toString(),
      task: this.task.toPrimitives(),
      survey: this.survey.toPrimitives(),
      hasProblem: this.hasProblem.value
    }
  }
}
