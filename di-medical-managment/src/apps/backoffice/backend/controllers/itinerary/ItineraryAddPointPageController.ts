import { Request, Response } from "express";
import { ClientSearcher } from "../../../../../Contexts/Backoffice/Client/application/SearchAll/ClientSearcher";
import { UserSearcher } from "../../../../../Contexts/Backoffice/User/application/SearchAll/UserSearcher";
import { SurveySearcher } from "../../../../../Contexts/Backoffice/Survey/application/SearchAll/SurveySearcher";
import { ItineraryId } from "../../../../../Contexts/Backoffice/Itinerary/domain/ItineraryId";
import { ItineraryFinder } from "../../../../../Contexts/Backoffice/Itinerary/domain/ItineraryFinder";
import { certificateStates } from "../../../../../Contexts/Backoffice/Itinerary/domain/PointCertificate";
import { ssaStates } from "../../../../../Contexts/Backoffice/Itinerary/domain/PointSSA";

export class ItineraryAddPointPageController {
  constructor(
    private clientSearcher: ClientSearcher,
    private userSearcher: UserSearcher,
    private surveySearcher: SurveySearcher,
    private itineraryFinder: ItineraryFinder
  ) {}

  async run(req: Request, res: Response) {
    try {

      const { id } = req.params;

      const itinerary = await this.itineraryFinder.run({
        id: new ItineraryId(id)
      });

      const clients = await this.clientSearcher.run();

      const users = await this.userSearcher.run();

      const surveys = await this.surveySearcher.run();

      res.status(200).render('itinerary/add-point', {
        clients: clients.map(c => c.toPrimitives()),
        users: users.map(u => u.toPrimitives()),
        surveys: surveys.map(su => su.toPrimitives()),
        itinerary: itinerary.toPrimitives(),
        certificateStates,
        ssaStates
      });
    } catch (error) {
      res.status(500).render('error/error', {
        message: 'Ocurrio un error, contacta soporte'
      });
    }
  }
}
