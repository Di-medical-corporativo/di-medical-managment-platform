import { ClientFinder } from "../../../Client/domain/ClientFinder";
import { ClientId } from "../../../Client/domain/ClientId";
import { ClientRepository } from "../../../Client/domain/ClientRepository";
import { UserFinder } from "../../../User/domain/UserFinder";
import { UserId } from "../../../User/domain/UserId";
import { UserRepository } from "../../../User/domain/UserRepository";
import { Invoice } from "../../domain/Invoice";
import { ItineraryId } from "../../domain/ItineraryId";
import { ItineraryRepository } from "../../domain/ItineraryRepository";
import { PointCertificate } from "../../domain/PointCertificate";
import { PointId } from "../../domain/PointId";
import { PointObservation } from "../../domain/PointObservation";
import { PointSSA } from "../../domain/PointSSA";
import { Client } from "../../../Client/domain/Client";
import { User } from "../../../User/domain/User";
import { PointFinder } from "../../domain/PointFinder";
import { Point } from "../../domain/Point";
import { PointClient } from "../../domain/PointClient";
import { ClientName } from "../../../Client/domain/ClientName";
import { PointUser } from "../../domain/PointUser";
import { UserFirstName } from "../../../User/domain/UserFirstName";
import { UserLastName } from "../../../User/domain/UserLastName";

export class PointUpdator {
  private clientFinder: ClientFinder;
  
  private userFinder: UserFinder;

  private pointFinder: PointFinder;

  constructor(
    private repository: ItineraryRepository,
    private clientRepository: ClientRepository,
    private userRepository: UserRepository
  ) {
    this.clientFinder = new ClientFinder(clientRepository);

    this.userFinder = new UserFinder(userRepository);
  
    this.pointFinder = new PointFinder(repository);
  }

  async run(params: {
    id: PointId,
    itineraryId: ItineraryId,
    clientId: ClientId,
    userAssigned: UserId,
    invoices: Invoice[],
    certificate: PointCertificate,
    ssa: PointSSA,
    observation: PointObservation
  }) {
    const point: Point = await this.pointFinder.run({
      id: params.id
    });

    const userAssigned: User = await this.userFinder.run(params.userAssigned.toString());

    const client: Client = await this.clientFinder.run({
      id: params.clientId
    });

    const { id, name } = client.toPrimitives();

    point.updateClient(PointClient.create({
      id: new ClientId(id),
      name: new ClientName(name)
    }));

    const { id: userId, firstName, lastName } = userAssigned.toPrimitives();

    point.updateUserAssigned(PointUser.create({
      id: new UserId(userId),
      firstName: new UserFirstName(firstName),
      lastName: new UserLastName(lastName)
    }));

    point.updateCertificate(params.certificate);

    point.updateInvoices(params.invoices);

    point.updateObservation(params.observation);

    point.updateSSA(params.ssa);

    await this.repository.updatePoint(point);
  }
}
