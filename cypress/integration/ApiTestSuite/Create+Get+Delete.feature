Feature: End to end employee record life-cycle.

    API where the users can add/fetch/remove competencies to their account.
    
    Scenario: A user wants to add, fetch and then remove a competency .
        Then Make a POST call to add a competency and validate its response.
        Then Make a GET call to fetch saved competencies and validate its response.
        Then Make a DELETE call to remove competency and validate its response.

    Scenario: A user wants to fetch a removed competency, then GET API should throw BAD REQUEST.
        Then Make a DELETE call to remove competency and validate its response.
        Then Make a GET call to fetch saved competencies and validate its response.

