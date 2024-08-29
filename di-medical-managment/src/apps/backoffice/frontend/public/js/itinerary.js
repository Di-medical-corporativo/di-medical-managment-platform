let totalPoints = 0;

function addPointToTable() {
  const table = document.getElementById('point-table-body-list');

  totalPoints++;

  const clientId = document.getElementById('clientId');

  const userId = document.getElementById('userId');

  const invoices = document.getElementById('invoices');

  const certificate = document.getElementById('certificate');

  const ssa = document.getElementById('ssa');

  const type = document.getElementById('type');

  const surveyId = document.getElementById('surveyId');

  let surveyValue = surveyId.value;

  let surveyText = surveyId.options[surveyId.selectedIndex].text

  if(type.value === 'point-parcel') {
    surveyValue = 'point-no-survey';

    surveyText = 'Punto sin encuesta'
  }

  console.log(surveyValue)

  const template = `
  <tr>
                <td>
                  ${totalPoints}
                </td>
                <td>
                  <small>${clientId.options[clientId.selectedIndex].text}</small>
                  <input value="${clientId.value}" type="text" class="input" readonly name="points[${totalPoints}][clientId]" hidden>
                </td>
                <td>
                  <small>${userId.options[userId.selectedIndex].text}</small>
                  <input value="${userId.value}" type="text" class="input" readonly name="points[${totalPoints}][userId]" hidden>
                </td>
                <td>
                  <small>${invoices.value}</small>
                  <input value="${invoices.value}" type="text" class="input" readonly name="points[${totalPoints}][invoice]" hidden>
                </td>
                <td>
                  <small>${certificate.value}</small>
                  <input value="${certificate.value}" type="text" class="input" readonly name="points[${totalPoints}][certificate]" hidden>
                </td>
                <td>
                  <small>${ssa.value}</small>
                  <input value="${ssa.value}" type="text"class="input" readonly name="points[${totalPoints}][ssa]" hidden>
                </td>
                <td>
                  <small>${type.options[type.selectedIndex].text}</small>
                  <input value="${type.value}" type="text" class="input" readonly name="points[${totalPoints}][type]" hidden>
                </td>
                <td>
                  <small>${surveyText}</small>
                  <input value="${surveyValue}" type="text" class="input" readonly name="points[${totalPoints}][surveyId]" hidden>
                </td>
                <td>
                  <button class="button danger" id="delete-point" onclick="deletePoint(event)" type="button">X</button>
                </td>
    </tr>
  `

  table.insertAdjacentHTML('beforeend', template);
}

function deletePoint(event) {
  const button = event.target;

  const row = button.closest('tr');

  if(row) {
    row.remove();
  }

  totalPoints--;

  updatePointIndices();
}


function updatePointIndices() {
  // Obtener todas las filas de la tabla
  const rows = document.querySelectorAll('#point-list-table-data tr');

  // Recorrer cada fila y actualizar el índice
  rows.forEach((row, index) => {
      // Asegurarse de que solo se actualizan las filas que contienen puntos
      if (row.querySelector('input[name^="points["]')) {
          // Actualizar el texto del índice de punto (primer <td>)
          row.querySelector('td:first-child').textContent = index;

          // Actualizar los atributos name de los inputs dentro de la fila
          row.querySelectorAll('input').forEach(input => {
              // Actualizar el nombre usando el nuevo índice
              input.name = input.name.replace(/\[\d+\]/, `[${index}]`);
          });
      }
  });
}
