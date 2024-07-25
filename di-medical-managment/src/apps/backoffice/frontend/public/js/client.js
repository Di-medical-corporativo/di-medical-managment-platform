async function deleteClient(id = '') {
  fetch(`/backoffice/client/${id}`);
}
