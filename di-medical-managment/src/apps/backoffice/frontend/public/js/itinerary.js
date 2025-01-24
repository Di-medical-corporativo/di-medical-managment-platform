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

  const observations = document.getElementById('observation');

  const observation = observations.value || 'Sin observaciones';

  let surveyValue = surveyId.value;

  let surveyText = surveyId.options[surveyId.selectedIndex].text

  if (type.value === 'point-parcel') {
    surveyValue = 'point-no-survey';

    surveyText = 'Punto sin encuesta'
  }

  if (invoices.value.length === 0) {
    swal({
      title: "¡Error!",
      text: "Debes agregar al menos una factura al campo.",
      icon: "error",
      dangerMode: true
    });

    return;
  }

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
                  <input value="${ssa.value}" type="text" class="input" readonly name="points[${totalPoints}][ssa]" hidden>
                </td>
                <td>
                  <small>${type.options[type.selectedIndex].text}</small>
                  <input value="${type.value}" type="text" class="input" readonly name="points[${totalPoints}][type]" hidden>
                </td>
                <td>
                  <small>${observation}</small>
                  <input type="text" class="input" value="${observation}" readonly name="points[${totalPoints}][observation]" hidden>
                </td>
                <td>
                  <small>${surveyText}</small>
                  <input value="${surveyValue}" type="text" class="input" readonly name="points[${totalPoints}][surveyId]" hidden>
                </td>
                <td>
                  <button class="button danger hide" id="delete-point" onclick="deletePoint(event)" type="button">X</button>
                </td>
    </tr>
  `

  invoices.value = "";
  observations.value = "";

  table.insertAdjacentHTML('beforeend', template);
}

function deletePoint(event) {
  const button = event.target;

  const row = button.closest('tr');

  if (row) {
    row.remove();
  }

  totalPoints--;

  updatePointIndices();
}


function updatePointIndices() {
  const rows = document.querySelectorAll('#point-list-table-data tr');

  rows.forEach((row, index) => {
    if (row.querySelector('input[name^="points["]')) {
      row.querySelector('td:first-child').textContent = index;

      row.querySelectorAll('input').forEach(input => {
        input.name = input.name.replace(/\[\d+\]/, `[${index}]`);
      });
    }
  });
}
