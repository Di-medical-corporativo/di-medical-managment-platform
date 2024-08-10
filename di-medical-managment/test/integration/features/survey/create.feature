Feature: Create a survey  
  Scenario: A valid survey with questions type multiple
  Given I send a POST request to "/backoffice/survey/fc30f0f9-0294-44c0-93e5-01a9ec2446ed" with body:
  """
  {
    "id": "fc30f0f9-0294-44c0-93e5-01a9ec2446ed",
    "title": "Test survey",
    "description": "This is test survey",
    "questions": [
      {
        "id": "5740f837-cb68-4f2c-8ac0-5873fd38c8b1",
        "text": "Test question",
        "order": 1,
        "type": "open",
        "options": []
      }
  ]
}
  """
  Then the response status code should be 201
  And the body should be empty
