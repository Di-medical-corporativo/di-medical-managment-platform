Feature: Create a new client

Scenario: A valid client
  Given I send a POST request to "/backoffice/client/fc30f0f9-0294-44c0-93e5-01a9ec2446ed" with body:
  """
  {
    "id": "fc30f0f9-0294-44c0-93e5-01a9ec2446ed",
    "name": "12345",
    "address": "model"
  }
  """
  Then the response status code should be 201
  