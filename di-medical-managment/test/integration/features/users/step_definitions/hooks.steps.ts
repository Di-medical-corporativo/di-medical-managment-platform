import { Server } from '../../../../../src/server';
import { setUpContainer } from '../../../../../src/shared/infra/dependency-injection';
import { AfterAll, BeforeAll } from '@cucumber/cucumber';

let application: Server;

BeforeAll(async () => {
  const container = await setUpContainer();
  application = new Server(container);
  await application.start();
});

AfterAll(async () => {
  await application.stop();
});

export { application };
