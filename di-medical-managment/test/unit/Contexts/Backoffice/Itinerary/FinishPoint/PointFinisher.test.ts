import { PointFinisher } from "../../../../../../src/Contexts/Backoffice/Itinerary/application/FinishPoint/PointFinisher";
import { ParcelPoint } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/Point";
import { PointComment } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/PointComment";
import { PointId } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/PointId";
import { PointNotFound } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/PointNotFound";
import { PointProblem } from "../../../../../../src/Contexts/Backoffice/Itinerary/domain/PointProblem";
import { StatusList } from "../../../../../../src/Contexts/Backoffice/Task/domain/TaskStatus";
import { ItineraryRepositoryMock } from "../../../../__mock__/tineraryRepositoryMock";

describe('PointFinisher', () => {
  let repository: ItineraryRepositoryMock;
  
  let pointFinisher: PointFinisher;

  beforeEach(() => {
    repository = new ItineraryRepositoryMock();

    pointFinisher = new PointFinisher(repository);
  });
  
  test('should end a point', async () => {
    const point = ParcelPoint.fromPrimitives({
        certificate: '',
        client: {
          id: '',
          name: ''
        },
        comment: '',
        hasProblem: false,
        id: '',
        invoice: [
          {
            id: '',
            number: ''
          }
        ],
        itineraryId: '',
        observation: '',
        ssa: '',
        status: StatusList.Progress,
        task: {
          id: '',
          status: StatusList.Progress
        },
         userAssigned: {
          firstName: '',
          id: '',
          lastName: ''
         }
      })
    

    repository.setReturnForPoint(point);

    await pointFinisher.run({
      id: new PointId(''),
      comment: new PointComment(''),
      hasProblem: new PointProblem(false)
    });

    repository.assertEndPointHaveBeenCalled();
  });

  test('should throw point not found if the point does not extist', async () => {
    const point = ParcelPoint.fromPrimitives({
      certificate: '',
      client: {
        id: '',
        name: ''
      },
      comment: '',
      hasProblem: false,
      id: '',
      invoice: [
        {
          id: '',
          number: ''
        }
      ],
      itineraryId: '',
      observation: '',
      ssa: '',
      status: StatusList.Progress,
      task: {
        id: '',
        status: StatusList.Progress
      },
       userAssigned: {
        firstName: '',
        id: '',
        lastName: ''
       }
    })
  

  repository.setReturnForPoint(null);

  await expect(pointFinisher.run({
    id: new PointId(''),
    comment: new PointComment(''),
    hasProblem: new PointProblem(false)
  })).rejects.toThrow(PointNotFound)
  });
});
