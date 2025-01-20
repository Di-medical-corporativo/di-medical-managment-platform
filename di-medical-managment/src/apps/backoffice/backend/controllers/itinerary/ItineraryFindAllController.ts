import { ItinerarySearcher } from "../../../../../Contexts/Backoffice/Itinerary/application/SearchAll/ItinerarySearcher";
import { Request, Response } from "express";


export class ItineraryFindAllController {
  constructor(
    private itinerarySearcher: ItinerarySearcher
  ) {}

  async run(req: Request, res: Response) {
    try {
      const { filter } = req.query as { filter?: string } as { filter?: string };; 

      let dateToFilter = new Date();

      let monthToFilter: number = dateToFilter.getMonth() + 1;

      let yearToFilter: number = dateToFilter.getFullYear();

      if(filter) {
        const [year, monthNumber] = filter.split('-');
        
        yearToFilter = parseInt(year, 10);

        monthToFilter = parseInt(monthNumber, 10);
      }

      const itineraries = await this.itinerarySearcher.run({
        month: monthToFilter,
        year: yearToFilter
      });

      res.status(200).render('itinerary/main', {
        itineraries: itineraries.map(i => i.toPrimitives()),
        yearToFilter,
        month: this.getMonthName(monthToFilter),
      });
    } catch (error) {
      res.status(500).render('error/error', {
        message: 'Ocurrio un error, contacta soporte'
      });
    }
  }

  private getMonthName(monthNumber: number) {
    const months = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    return months[monthNumber - 1]; 
  }
}
