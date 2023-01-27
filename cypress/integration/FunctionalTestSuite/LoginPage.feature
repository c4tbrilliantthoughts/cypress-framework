Feature: Login Page Feature

    Page where the users can login to their accounts.

    Background: Login Page
        Given A user enters to the login page.
    @focus
    Scenario: Valid users.

        When A user provides below user credentials.
            | Email                              |
            | naresh.gopishetty@senecaglobal.com |
        And /login request is intercepted.
        Then Save token and /login response should give 303 status code.

    Scenario: Invalid users.

        When A user provides below user credentials.
            | Username    | Password     |
            | naresh.raj  | undefined    |
            | undefined   | 8JB2z4#Wu2l! |
            | naresh.raj  | null         |
            | null        | 8JB2z4#Wu2l! |
            | null        | undefined    |
            | -123456789  | +123456789   |
            | naresh.raj  | JB2z4#Wu2l!  |
            | "naresh.raj | JB2z4#Wu2l!  |
        Then "Login failed" should be displayed on the login page.

