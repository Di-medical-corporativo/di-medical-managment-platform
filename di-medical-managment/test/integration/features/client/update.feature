Feature: Update a client
  Scenario: Update an existing sucursal
    Given I send a PUT request to "/client/fc30f0f9-0294-44c0-93e5-01a9ec2446ed" with body:
     """
      {
        "name": "Test role modified",
        "address": "Test address modified",
        "id": "fc30f0f9-0294-44c0-93e5-01a9ec2446ed"
      }
    """
    Then the response status code should be 200
    And the body should be empty
