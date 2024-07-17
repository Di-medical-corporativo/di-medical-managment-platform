const common = [
  '--require-module ts-node/register', // Load TypeScript module,
  '--format progress'
]

const user = [
  '--require-module ts-node/register',
  'test/integration/features/users/*.feature', // Path to feature files
  '--require test/integration/features/users/step_definitions/*.steps.ts' // Path to step definitions
].join(' ');

const sucursal = [
  '--require-module ts-node/register',
  'test/integration/features/sucursal/*.feature', // Path to feature files
  '--require test/integration/features/sucursal/step_definitions/*.steps.ts' // Path to step definitions
].join(' ');

const truck = [
  '--require-module ts-node/register',
  'test/integration/features/truck/*.feature', // Path to feature files
  '--require test/integration/features/truck/step_definitions/*.steps.ts' // Path to step definitions
].join(' ');

const client = [
  '--require-module ts-node/register',
  'test/integration/features/client/*.feature', // Path to feature files
  '--require test/integration/features/client/step_definitions/*.steps.ts' // Path to step definitions
].join(' ');


module.exports = {
  sucursal,
  user,
  truck,
  client
}
