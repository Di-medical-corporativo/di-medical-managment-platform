import { ContainerBuilder, JsonFileLoader } from 'node-dependency-injection';

export const setUpContainer = async () => {
  const container = new ContainerBuilder()
  const loader = new JsonFileLoader(container)
  await loader.load(`${__dirname}/file.json`)
  return container
}

