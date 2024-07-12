Feature: Create a new truck

Scenario: A valid non existing truck
  Given I send a POST request to "/truck/fc30f0f9-0294-44c0-93e5-01a9ec2446ed" with body:
  """
  {
    "id": "fc30f0f9-0294-44c0-93e5-01a9ec2446ed",
    "plate": "12345",
    "model": "model",
    "brand": "brand"
  }
  """
  Then the response status code should be 201
  And the body should be empty
  