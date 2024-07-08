Feature: Create a new user
  Sucursals must exists already in order to create a user

  Background:
    Given I create a sucursal "/sucursal/15a28f10-d4b1-440d-b0b2-98b716728942" with body:
    """
      {
        "id": "15a28f10-d4b1-440d-b0b2-98b716728942",
        "name": "Test role",
        "address": "Test address",
        "phone": "5525179479"
      }
    """

  Scenario: A valid non existing user with the sucursal created
    Given I send a POST request to "/user/fc30f0f9-0294-44c0-93e5-01a9ec2446ed" with body:
    """
    {
      "id": "fc30f0f9-0294-44c0-93e5-01a9ec2446ed",
      "firstName": "Test role",
      "lastName": "This is a test role",
      "job": "Test",
      "phone": "5525179478",
      "email": "test@gmail.com",
      "isAdmin": true,
      "createdAt": "2023-07-02T14:30:00.123Z",
      "sucursalId": "15a28f10-d4b1-440d-b0b2-98b716728942",
      "password": "1234"
    }
    """
  Then the response status code should be 201
  And the body should be empty

  Scenario: An invalid sucursalId
  Given I send a POST request to "/user/57ab3578-dd5a-4a32-95bf-490377af0a8a" with body:
  """
  {
    "id": "57ab3578-dd5a-4a32-95bf-490377af0a8a",
    "firstName": "Test role",
    "lastName": "This is a test role",
    "job": "Test",
    "phone": "5525179478",
    "email": "test2@gmail.com",
    "isAdmin": true,
    "createdAt": "2023-07-02T14:30:00.123Z",
    "sucursalId": "not-valid",
    "password": "1234"
  }
  """
  Then the response status code should be 404
  And the body should be empty

  Scenario: Create a duplicated email user and duplicated id
  Given I send a POST request to "/user/fc30f0f9-0294-44c0-93e5-01a9ec2446ed" with body:
  """
  {
    "id": "fc30f0f9-0294-44c0-93e5-01a9ec2446ed",
    "firstName": "Test role",
    "lastName": "This is a test role",
    "job": "Test",
    "phone": "5525179478",
    "email": "test@gmail.com",
    "isAdmin": true,
    "createdAt": "2023-07-02T14:30:00.123Z",
    "sucursalId": "15a28f10-d4b1-440d-b0b2-98b716728942",
    "password": "1234"
  }
  """
  Then the response status code should be 400
  And the body should be empty

  Scenario: Create a duplicated email user
  Given I send a POST request to "/user/61636867-5caf-4008-a541-fda5825c86f3" with body:
  """
  {
    "id": "61636867-5caf-4008-a541-fda5825c86f3",
    "firstName": "Test role",
    "lastName": "This is a test role",
    "job": "Test",
    "phone": "5525179478",
    "email": "test@gmail.com",
    "isAdmin": true,
    "createdAt": "2023-07-02T14:30:00.123Z",
    "sucursalId": "15a28f10-d4b1-440d-b0b2-98b716728942",
    "password": "1234"
  }
  """
  Then the response status code should be 400
  And the body should be empty

  Scenario: Create a duplicated id user
  Given I send a POST request to "/user/fc30f0f9-0294-44c0-93e5-01a9ec2446ed" with body:
  """
  {
    "id": "fc30f0f9-0294-44c0-93e5-01a9ec2446ed",
    "firstName": "Test role",
    "lastName": "This is a test role",
    "job": "Test",
    "phone": "5525179478",
    "email": "test3@gmail.com",
    "isAdmin": true,
    "createdAt": "2023-07-02T14:30:00.123Z",
    "sucursalId": "15a28f10-d4b1-440d-b0b2-98b716728942",
    "password": "1234"
  }
  """
  Then the response status code should be 400
  And the body should be empty
