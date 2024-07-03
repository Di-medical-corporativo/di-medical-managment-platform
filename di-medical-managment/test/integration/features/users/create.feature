Feature: Create a new user
  Scenario: A valid non existing user
  Given I send a POST request to "/user/fc30f0f9-0294-44c0-93e5-01a9ec2446ed" with body:
  """
  {
    "id": "fc30f0f9-0294-44c0-93e5-01a9ec2446ed",
    "name": "Test role",
    "description": "This is a test role",
    "birthDate": "2023-07-02T14:30:00.123Z",
    "job": "Test",
    "phone": "5525179478",
    "email": "test@gmail.com",
    "password": "1234"
    "createdAt": "2023-07-02T14:30:00.123Z",
  }
  """
  Then the response status code should be 201
  And the body should be empty


