Feature: User Login API intercept

    Intercept login API when the users login to their accounts.

    Background: User login via UI.
        Given A user enters to the login page.
    @focus
    Scenario: Valid users.

        When A user provides below user credentials.
            | Email   |
            | naresh.gopishetty@senecaglobal.com |
        And /login request is intercepted.
        Then Save token and /login response should give 303 status code.
        
    Scenario: Invalid users.

        When A user provides below user credentials.
            | Username   | Password     |
            | naresh.raj | undefined    |
            | undefined  | 8JB2z4#Wu2l! |
            | naresh.raj | null         |
            | null       | 8JB2z4#Wu2l! |
            | null       | undefined    |
        And /login request is intercepted.
        Then /login response should give 401 Unauthorized status code.
