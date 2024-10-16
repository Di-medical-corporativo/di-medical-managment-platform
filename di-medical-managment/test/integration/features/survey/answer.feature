Feature: Answer a survey
  Background:
    Given I send a POST request to "/backoffice/survey/d20e57b1-7fe5-4234-89e8-46ae4af9d574" with body:
      """
      {
        "id": "d20e57b1-7fe5-4234-89e8-46ae4af9d574",
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
    Then the response status code should be 302

  Scenario: A Answer for an active survey
    Given I send a POST request to "/backoffice/survey/d20e57b1-7fe5-4234-89e8-46ae4af9d574/answer" with body:
    """
    {
      "id": "fc30f0f9-0294-44c0-93e5-01a9ec2446ed",
      "surveyId": "d20e57b1-7fe5-4234-89e8-46ae4af9d574",
      "answers": [
        {
          "id": "84b100e7-8efe-4f6b-9e91-99099df18c4c",
          "answerText": "Test question",
          "questionId": "5740f837-cb68-4f2c-8ac0-5873fd38c8b1"
        },
        {
          "id": "84b100e7-8efe-4f6b-9e91-99099df18c4c",
          "answerText": "Test question",
          "questionId": "5740f837-cb68-4f2c-8ac0-5873fd38c8b1",
          "option": {
            "id": "5740f837-cb68-4f2c-8ac0-5873fd38c8b1",
            "optionId": "5740f837-cb68-4f2c-8ac0-5873fd38c8b1"
          }
        }
      ]
    }
    """
    Then the response status code should be 302
    And the body should be empty

   Scenario: An answer for an nonexisting  survey
    Given I send a POST request to "/backoffice/survey/fd30f0f9-0294-44c0-93e5-01a9ec2446ed/answer" with body:
    """
    {
      "id": "fd30f0f9-0294-44c0-93e5-01a9ec2446ed",
      "surveyId": "fd30f0f9-0294-44c0-93e5-01a9ec2446ed",
      "answers": [
        {
          "id": "84b100e7-8efe-4f6b-9e91-99099df18c4c",
          "answerText": "Test question",
          "questionId": "5740f837-cb68-4f2c-8ac0-5873fd38c8b1"
        }
      ]
    }
    """
    Then the response status code should be 404
    And the body should be empty
