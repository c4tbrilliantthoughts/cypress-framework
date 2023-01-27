import {
  Given,
  When,
  Then,
  And,
  Before,
  After
} from "cypress-cucumber-preprocessor/steps";
import core from "../../../framework/Utils/CoreFunctions";
import loginPage from "../../../framework/Pages/LoginPage";
import welcomePage from "../../../framework/Pages/WelcomePage";

const routeMatcher = {
  method: Cypress.env("postMethod"),
  path: "/auth/signin"
};

Before(() => {
  core.log("Login API Intercept Test - Started");
});

After(() => {
  core.log("Login API Intercept Test - Finished");
});

Given("A user enters to the login page.", () => {
  core.visit(Cypress.env("loginURI"));
});

When("A user provides below user credentials.", (dataTable) => {
  let users = [];
  dataTable.rawTable.slice(1).forEach((user, index) => {
    users.push(user);
  });
  core.log("User credentials are saved in fixture folder as userData.json");
  core.writeFile(Cypress.env("userDataFixture"), JSON.stringify(users));
});

And("/login request is intercepted.", () => {
  core.readFile(Cypress.env("userDataFixture")).then(function (users) {
    users.forEach((user) => {
      core.intercept(routeMatcher, "login");
      loginPage.magicLogin(user);
    });
  });
});

Then("Save token and /login response should give {int} status code.", (_statusCode) => {
  core.waitForObject("@login").then((resolve) => {
    core.writeFile("./cypress/payload/magic/response/magicLinkResponse.json", JSON.stringify(resolve.response));
    expect(resolve.response.statusCode).to.eq(_statusCode);
    core.log("User login is intercepted and response saved in payload folder");
  });
});

Then("/login response should give {int} Unauthorized status code.", (_statusCode) => {
  core.waitForObject("@login").then((resolve) => {
    expect(resolve.response.statusCode).to.eq(_statusCode);
  });
});