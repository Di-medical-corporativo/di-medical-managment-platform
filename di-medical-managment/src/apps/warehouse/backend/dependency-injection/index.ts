import { ContainerBuilder, YamlFileLoader } from "node-dependency-injection";
import path from "path";

const container = new ContainerBuilder();
const loader = new YamlFileLoader(container);
const env = process.env.NODE_ENV || 'dev';

const yamlFilePath = path.resolve(__dirname, `application.${env}.yaml`);

try {
  loader.load(yamlFilePath);
  console.log(`Loaded configuration from ${yamlFilePath}`);
} catch (error) {
  console.error(`Failed to load configuration file: ${yamlFilePath}`);
  console.error(error);
}

export default container;
