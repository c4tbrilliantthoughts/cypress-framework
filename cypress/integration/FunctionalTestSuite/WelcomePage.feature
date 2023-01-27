Feature: Welcome Page Feature

    Validate the functionalities on Welcome Page.

    Background: Login and Navigate to Welcome Page.
        Given A user is logged into the Swimlane application.
        When A user is on the Welcome Page.

    Scenario: Verify WelcomePage title contains Swimlane.
        Then WelcomePage title must contain "Swimlane".
