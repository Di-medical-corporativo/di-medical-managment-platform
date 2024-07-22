import { SurveyAnswerer } from "../../../../../Contexts/Backoffice/Survey/application/Answer/SurveyAnswerer";
import { Request, Response } from "express";

export class SurveyAnswerController {
  constructor(
    private surveyAnswerer: SurveyAnswerer
  ) {}

  async run(req: Request, res: Response) {
    res.sendStatus(201);
  }
}
