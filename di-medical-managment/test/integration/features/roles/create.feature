Feature: Create a new role
  Scenario: A valid non existing role
  Given I send a PUT request to "/roles/fc30f0f9-0294-44c0-93e5-01a9ec2446ed" with body:
  """
  {
    "id": "fc30f0f9-0294-44c0-93e5-01a9ec2446ed",
    "name": "Test role",
    "description": "This is a test role"
  }
  """
  Then the response status code should be 201
  And the body should be empty


