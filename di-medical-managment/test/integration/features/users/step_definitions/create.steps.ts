import { Given, When, Then } from '@cucumber/cucumber';

Given('I have a configured Cucumber setup for users', () => {
  console.log('Configured Cucumber setup for users');
});

When('I run the user tests', () => {
  console.log('Running the user tests');
});

Then('I should see the user test results', () => {
  console.log('Seeing the user test results');
});
