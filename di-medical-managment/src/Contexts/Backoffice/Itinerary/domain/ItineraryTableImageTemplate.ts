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
              thead {
                background-color: #FF8C00; /* Naranja oscuro */
                color: #fff;
              }
              table, th, td {
                border: 1px solid black;
              }
              th, td {
                padding: 8px;
                text-align: left;
              }
              th {
                background-color: #FF8C00; /* Naranja oscuro */
                color: #fff;
              }
              tbody tr:nth-child(even) {
                background-color: #f2f2f2; /* Gris claro para filas pares */
              }
              tbody tr:nth-child(odd) {
                background-color: #ffffff; /* Blanco para filas impares */
              }
              /* Colores condicionales para el estado */
              .status-assigned {
                color: #1E90FF; /* Azul */
                font-weight: bold;
              }
              .status-progress {
                color: #FFA500; /* Naranja */
                font-weight: bold;
              }
              .status-completed {
                color: #32CD32; /* Verde */
                font-weight: bold;
              }
              .status-pastdue {
                color: #FF6347; /* Rojo */
                font-weight: bold;
              }
              .status-point-has-problem {
                color: #FF4500; /* Naranja Rojo */
                font-weight: bold;
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
                ${itineraryPlain.points.map(point => {
                  const statusClass = 
                    point.status === 'assigned' ? 'status-assigned' :
                    point.status === 'in-progress' ? 'status-progress' :
                    point.status === 'completed' ? 'status-completed' :
                    point.status === 'pastdue' ? 'status-pastdue' :
                    point.status === 'point-has-problem' ? 'status-point-has-problem' : '';

                  const statusText = 
                    point.status === 'assigned' ? 'Asignado' :
                    point.status === 'in-progress' ? 'En progreso' :
                    point.status === 'completed' ? 'Completado' :
                    point.status === 'pastdue' ? 'Atrasado' :
                    point.status === 'point-has-problem' ? 'Punto con problema' : '';

                  return `
                  <tr>
                    <td>${point.client.name}</td>
                    <td>${point.userAssigned.firstName} ${point.userAssigned.lastName}</td>
                    <td>${point.invoice.map((invoice: any) => invoice.number).join(', ')}</td>
                    <td>${point.comment}</td>
                    <td>${point.observation}</td>
                    <td>${point.certificate}</td>
                    <td>${point.ssa}</td>
                    <td class="${statusClass}">${statusText}</td>
                  </tr>
                `;
                }).join('')}
              </tbody>
            </table>
          </body>
        </html>
      `;
  }
}
