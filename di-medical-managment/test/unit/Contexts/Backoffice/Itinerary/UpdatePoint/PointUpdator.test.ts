import { Client } from "../../../../../../src/Contexts/Backoffice/Client/domain/Client";
import { ClientAddress } from "../../../../../../src/Contexts/Backoffice/Client/domain/ClientAddress";
import { ClientId } from "../../../../../../src/Contexts/Backoffice/Client/domain/ClientId";
import { ClientName } from "../../../../../../src/Contexts/Backoffice/Client/domain/ClientName";
import { PointUpdator } from "../../../../../../src/Contexts/Backoffice/Itinerary/application/UpdatePoint/PointUpdator";
import { Invoice } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/Invoice";
import { InvoiceId } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/InvoiceId";
import { InvoiceNumber } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/InvoiceNumber";
import { ItineraryId } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/ItineraryId";
import { ParcelPoint } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/Point";
import { PointCertificate } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/PointCertificate";
import { PointClient } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/PointClient";
import { PointComment } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/PointComment";
import { PointId } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/PointId";
import { PointNotFound } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/PointNotFound";
import { PointObservation } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/PointObservation";
import { PointSSA } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/PointSSA";
import { PointStatus } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/PointStatus";
import { PointTask } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/PointTask";
import { PointUser } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/PointUser";
import { Sucursal } from "../../../../../../src/Contexts/Backoffice/Sucursal/domain/Sucursal";
import { SucursalAddress } from "../../../../../../src/Contexts/Backoffice/Sucursal/domain/SucursalAddress";
import { SucursalId } from "../../../../../../src/Contexts/Backoffice/Sucursal/domain/SucursalId";
import { SucursalName } from "../../../../../../src/Contexts/Backoffice/Sucursal/domain/SucursalName";
import { SucursalPhone } from "../../../../../../src/Contexts/Backoffice/Sucursal/domain/SucursalPhone";
import { TaskId } from "../../../../../../src/Contexts/Backoffice/Task/domain/TaskId";
import { TaskStatus } from "../../../../../../src/Contexts/Backoffice/Task/domain/TaskStatus";
import { User } from "../../../../../../src/Contexts/Backoffice/User/domain/User";
import { UserDate } from "../../../../../../src/Contexts/Backoffice/User/domain/UserDate";
import { UserEmail } from "../../../../../../src/Contexts/Backoffice/User/domain/UserEmail";
import { UserFirstName } from "../../../../../../src/Contexts/Backoffice/User/domain/UserFirstName";
import { UserId } from "../../../../../../src/Contexts/Backoffice/User/domain/UserId";
import { Role } from "../../../../../../src/Contexts/Backoffice/User/domain/UserIsAdmin";
import { UserJob } from "../../../../../../src/Contexts/Backoffice/User/domain/UserJob";
import { UserLastName } from "../../../../../../src/Contexts/Backoffice/User/domain/UserLastName";
import { UserPhone } from "../../../../../../src/Contexts/Backoffice/User/domain/UserPhone";
import { ClientRepositoryMock } from "../../../../__mock__/ClientRepositoryMock";
import { ItineraryRepositoryMock } from "../../../../__mock__/tineraryRepositoryMock";
import { UserRepositoryMock } from "../../../../__mock__/UserRepositoryMock";

describe('PointUpdator', () => {

  let repository: ItineraryRepositoryMock;

  let clientRepository: ClientRepositoryMock;

  let userRepository: UserRepositoryMock;

  let pointUpdator: PointUpdator;

  beforeEach(() => {
    repository = new ItineraryRepositoryMock();

    clientRepository = new ClientRepositoryMock();

    userRepository = new UserRepositoryMock();

    pointUpdator = new PointUpdator(
      repository,
      clientRepository,
      userRepository
    );
  });

  test('should update an existing point', async () => {
    const data = {
      id: new PointId(''),
      itineraryId: new ItineraryId(''),
      clientId: new ClientId(''),
      userAssigned: new UserId(''),
      invoices: [
        Invoice.create({ id: new InvoiceId(''), number: new InvoiceNumber('') })
      ],
      certificate: new PointCertificate(''),
      ssa: new PointSSA(''),
      observation: new PointObservation('')
    }

    const point = ParcelPoint.create({
      certificate: new PointCertificate(''),
      id: new PointId(''),
      client: PointClient.create({ id: new ClientId(''), name: new ClientName('') }),
      comment: new PointComment(''),
      invoice: [Invoice.create({ id: new InvoiceId(''), number: new InvoiceNumber('') })],
      itineraryId: new ItineraryId(''),
      observation: new PointObservation(''),
      ssa: new PointSSA(''),
      status: new PointStatus(''),
      task: PointTask.create({ id: new TaskId(''), status: new TaskStatus('') }),
      userAssigned: PointUser.create({ firstName: new UserFirstName(''), lastName: new UserLastName(''), id: new UserId('') })
    });

    repository.setReturnForPoint(point);

    const sucursal = Sucursal.create({
      id: new SucursalId(''),
      address: new SucursalAddress(''),
      name: new SucursalName(''),
      phone: new SucursalPhone('')
    });

    const user = User.create({
      createdAt: new UserDate(''),
      email: new UserEmail(''),
      firstName: new UserFirstName(''),
      id: new UserId(''),
      job: new UserJob(''),
      lastName: new UserLastName(''),
      phone: new UserPhone(''),
      modules: [],
      sucursal
    }); 

    userRepository.setReturnForSearch(user);

    const client = Client.create({
      id: new ClientId(''),
      name: new ClientName(''),
      address: new ClientAddress('')
    });

    clientRepository.setReturnForSearch(client);

    await pointUpdator.run(data);

    repository.assertUpdatePointHaveBeenCalledWith(point);
  });

  test('should throw PointNotFound if provided a non existing point', async () => {
    const data = {
      id: new PointId(''),
      itineraryId: new ItineraryId(''),
      clientId: new ClientId(''),
      userAssigned: new UserId(''),
      invoices: [
        Invoice.create({ id: new InvoiceId(''), number: new InvoiceNumber('') })
      ],
      certificate: new PointCertificate(''),
      ssa: new PointSSA(''),
      observation: new PointObservation('')
    }

    repository.setReturnForPoint(null);

    await expect(pointUpdator.run(data)).rejects.toThrow(PointNotFound);    
  });
});
