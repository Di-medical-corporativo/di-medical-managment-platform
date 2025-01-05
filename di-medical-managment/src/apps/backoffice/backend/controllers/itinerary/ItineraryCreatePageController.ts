import { Request, Response } from "express";
import { ClientSearcher } from "../../../../../Contexts/Backoffice/Client/application/SearchAll/ClientSearcher";
import { DepartmentSearcher } from "../../../../../Contexts/Backoffice/Department/application/SearchAll/DepartmentSearcher";
import { Department } from "../../../../../Contexts/Backoffice/Department/domain/Department";
import { certificateStates } from "../../../../../Contexts/Backoffice/Itinerary/domain/PointCertificate";
import { ssaStates } from "../../../../../Contexts/Backoffice/Itinerary/domain/PointSSA";
import { SucursalSearcher } from "../../../../../Contexts/Backoffice/Sucursal/application/SearchAll/SucursalSearcher";
import { SurveySearcher } from "../../../../../Contexts/Backoffice/Survey/application/SearchAll/SurveySearcher";
import { UserSearcher } from "../../../../../Contexts/Backoffice/User/application/SearchAll/UserSearcher";

export class ItineraryCreatePageController {
  constructor(
    private clientSearcher: ClientSearcher,
    private userSearcher: UserSearcher,
    private sucursalSearcher: SucursalSearcher,
    private surveySearcher: SurveySearcher,
    private departmentSearcher: DepartmentSearcher
  ) {}

  async run(req: Request, res: Response) {
    try {
      const clients = await this.clientSearcher.run();

      const users = await this.userSearcher.run();

      const sucursals = await this.sucursalSearcher.run();

      const surveys = await this.surveySearcher.run();

      const departments: Department[] = await this.departmentSearcher.run();

      res.status(200).render('itinerary/create', {
        clients: clients.map(c => c.toPrimitives()),
        users: users.map(u => u.toPrimitives()),
        branches: sucursals.map(s => s.toPrimitives()),
        surveys: surveys.map(su => su.toPrimitives()),
        certificateStates,
        departments: departments.map(d => d.toPrimitives()),
        ssaStates
      });
    } catch (error) {
      res.status(500).render('error/error', {
        message: 'Ocurrio un error, contacta soporte'
      });
    }
  }
}
