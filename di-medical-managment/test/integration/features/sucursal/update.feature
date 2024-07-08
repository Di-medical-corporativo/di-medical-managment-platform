Feature: Update a sucursal
  Scenario: Update an existing sucursal
    Given I send a PUT request to "/sucursal/fc30f0f9-0294-44c0-93e5-01a9ec2446ed" with body:
     """
      {
        "name": "Test role modified",
        "address": "Test address modified",
        "phone": "5525179478"
      }
    """
    Then the response status code should be 200
    And the body should be empty
  Scenario: Update a non existing sucursal
    Given I send a PUT request to "/sucursal/123" with body:
     """
      {
        "name": "Test role modified",
        "address": "Test address modified",
        "phone": "5525179478"
      }
    """
    Then the response status code should be 404
    And the body should be empty
