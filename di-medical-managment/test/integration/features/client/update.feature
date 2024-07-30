Feature: Update a client
  Background:
    Given I send a POST request to "/backoffice/client/fc30f0f9-0294-44c0-93e5-01a9ec2446ed" with body:
    """
    {
      "id": "fc30f0f9-0294-44c0-93e5-01a9ec2446ed",
      "name": "12345",
      "address": "model"
    }
    """
    Then the response status code should be 302

  Scenario: Update an existing client
    Given I send a PUT request to "/backoffice/client/fc30f0f9-0294-44c0-93e5-01a9ec2446ed" with body:
     """
      {
        "name": "Test role modified",
        "address": "Test address modified",
        "id": "fc30f0f9-0294-44c0-93e5-01a9ec2446ed"
      }
    """
    Then the response status code should be 302
    And the body should be empty
