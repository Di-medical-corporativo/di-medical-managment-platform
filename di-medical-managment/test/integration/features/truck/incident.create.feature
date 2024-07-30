Feature: Add a new incident

Background:
  Given I send a POST request to "/backoffice/truck/fc30f0f9-0294-44c0-93e5-01a9ec2446ed" with body:
  """
  {
    "id": "fc30f0f9-0294-44c0-93e5-01a9ec2446ed",
    "plate": "12345",
    "model": "model",
    "brand": "brand"
  }
  """
  Then the response status code should be 302
  And the body should be empty

Scenario: A valid incident to an existing truck
  Given I send a POST request to "/backoffice/truck/fc30f0f9-0294-44c0-93e5-01a9ec2446ed/incident/e3b51eb6-05ad-4a76-8497-d782d5f0aa20" with body:
  """
  {
    "id": "e3b51eb6-05ad-4a76-8497-d782d5f0aa20",
    "description": "test",
    "startDate": "2023-07-02T14:30:00.123Z",
    "truckId": "fc30f0f9-0294-44c0-93e5-01a9ec2446ed"
  }
  """
  Then the response status code should be 302
  And the body should be empty
  
Scenario: A valid incident to an non existing truck
  Given I send a POST request to "/backoffice/truck/fc30f0f9-0294-44c0-93e5-01a9ec2446ed/incident/e3b51eb6-05ad-4a76-8497-d782d5f0aa20" with body:
  """
  {
    "id": "e3b51eb6-05ad-4a76-8497-d782d5f0aa20",
    "description": "test",
    "startDate": "2023-07-02T14:30:00.123Z",
    "truckId": "fake-id"
  }
  """
  Then the response status code should be 404
  And the body should be empty
