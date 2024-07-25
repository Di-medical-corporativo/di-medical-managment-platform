Feature: Delete a client
  Scenario: Delete an existing client
    Given I send a DELETE request to "/backoffice/client/fc30f0f9-0294-44c0-93e5-01a9ec2446ed" with body:
     """
      {
        "id": "fc30f0f9-0294-44c0-93e5-01a9ec2446ed"
      }
    """
    Then the response status code should be 404
    And the body should be empty
