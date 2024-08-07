import { WarehouseBackendApp } from '../../../../../src/apps/backoffice/backend/WarehouseBackendApp';
import { AfterAll, BeforeAll } from '@cucumber/cucumber';

let application: WarehouseBackendApp;

BeforeAll(async () => {
  application = new WarehouseBackendApp();
  await application.start();
});

AfterAll(async () => {
  await application.stop();
});

export { application };
