import { Itinerary } from "./Itinerary";

export class ItineraryTableImageTemplate {
  static fromItinerary(itinerary: Itinerary): string {
    const itineraryPlain = itinerary.toPrimitives();
    
    return `
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                width: 1000px;
                height: auto;
              }
              table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 5px;
              }
              table, th, td {
                border: 1px solid black;
              }
              th, td {
                padding: 8px;
                text-align: left;
              }
              th {
                background-color: #f2f2f2;
              }
              h2 {
                text-align: center;
              }
            </style>
          </head>
          <body>
            <table>
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Responsable</th>
                  <th>Facturas</th>
                  <th>Comentario</th>
                  <th>Observaciones</th>
                  <th>Certificado</th>
                  <th>SSA</th>
                  <th>Estatus</th>
                </tr>
              </thead>
              <tbody>
                ${itineraryPlain.points.map(point => `
                  <tr>
                    <td>${point.client.name}</td>
                    <td>${point.userAssigned.firstName} ${point.userAssigned.lastName}</td>
                    <td>${point.invoice.map((invoice: any) => invoice.number).join(', ')}</td>
                    <td>${point.comment}</td>
                    <td>${point.observation}</td>
                    <td>${point.certificate}</td>
                    <td>${point.ssa}</td>
                    <td>${point.status}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </body>
        </html>
      `;
  }
}
