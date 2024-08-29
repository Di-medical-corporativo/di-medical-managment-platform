let totalPoints = 0;

function addPointToTable(survey = false) {
  const table = document.getElementById('point-table-body');

  totalPoints++;

  const template = `
  <tr>
     <td> ${totalPoints} </td>
    <td>
    <select name="points[1][clientId]" class="input">
      <% for (let i = 0; i < clients.length; i++) {%>
            <option value="<%= clients[i].id %>"><%= clients[i].name %> </option>
        <% } %>
    </select>
    </td>
    <td>
      <select name="points[1][userId]" class="input">
                      <% for (let i = 0; i < users.length; i++) {%>
                        <option value="<%= users[i].id %>"><%= users[i].firstName %> </option>
                      <% } %>
                    </select>
                  </td>
                  <td>
                    <input type="text" class="input" placeholder="Facturas separadas por comas" id="invoices">
                  </td>
                  <td>
                    <select name="points[1][certificate]" class="input">
                      <% for (let i = 0; i < certificateStates.length; i++) {%>
                        <option value="<%= certificateStates[i] %>"><%= certificateStates[i] %> </option>
                      <% } %>
                    </select>
                  </td>
                  <td>
                    <select name="points[1][ssa]" class="input">
                      <% for (let i = 0; i < ssaStates.length; i++) {%>
                        <option value="<%= ssaStates[i] %>"><%= ssaStates[i] %> </option>
                      <% } %>
                    </select>
                  </td>
                  <td>
                    <input type="text" value="Ruta" class="input" readonly>
                  </td>
                  <td>
                    <select name="points[1][ssa]" class="input">
                      <% for (let i = 0; i < surveys.length; i++) {%>
                        <option value="<%= surveys[i].title %>"><%= surveys[i].title %> </option>
                      <% } %>
                    </select>
                  </td>
                </tr>
  `

  table.insertAdjacentHTML('beforeend', template);
}
