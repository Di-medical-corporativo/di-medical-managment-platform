Feature: User feature

  Scenario: User scenario
    Given I have a configured Cucumber setup for users
    When I run the user tests
    Then I should see the user test results
