Feature: Create a new sucursal
  Scenario: A valid non existing sucursal
  Given I send a POST request to "/sucursal/fc30f0f9-0294-44c0-93e5-01a9ec2446ed" with body:
  """
  {
    "id": "fc30f0f9-0294-44c0-93e5-01a9ec2446ed",
    "name": "Test role",
    "address": "Test address",
    "phone": "5525179479"
  }
  """
  Then the response status code should be 201
  And the body should be empty


