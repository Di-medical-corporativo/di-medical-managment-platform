const common = [
  '--require-module ts-node/register', // Load TypeScript module,
  '--format progress'
]

const users = [
  ...common,
  'test/integration/features/users/*.feature', // Path to feature files
  '--require test/integration/features/users/step_definitions/*.steps.ts' // Path to step definitions
].join(' ');

const sucursal = [
  '--require-module ts-node/register',
  'test/integration/features/sucursal/*.feature', // Path to feature files
  '--require test/integration/features/sucursal/step_definitions/*.steps.ts' // Path to step definitions
].join(' ');

module.exports = {
  default: sucursal
}
