import { Given, When, Then, And, Before, After } from "cypress-cucumber-preprocessor/steps";
import core from "../../../framework/Utils/CoreFunctions";
import loginPage from "../../../framework/Pages/LoginPage";
import welcomePage from "../../../framework/Pages/WelcomePage";

const routeMatcher = {
  method: Cypress.env("postMethod"),
  path: "/auth/signin"
};
const loginURI = Cypress.env("loginURI");
const welcomeURI = Cypress.env("welcomeURI");
const userDataFixture = Cypress.env("userDataFixture")

Before(() => {
  core.log("Login Tests - Started");
});

After(() => {
  core.log("Login Tests - Finished");
});

Given("A user enters to the login page.", () => {
  core.visit(loginURI);
});

When("A user provides below user credentials.", (dataTable) => {
  let users = [];
  dataTable.rawTable.slice(1).forEach((user, index) => {
    users.push(user);
  });
  core.writeFile(userDataFixture, JSON.stringify(users));
});

Then("{string} should be displayed on the welcome page.", (expectedString) => {
  cy.readFile(userDataFixture).then(function (users) {
    users.forEach((user) => {
      loginPage.magicLogin(user);
      loginPage.validatePass(expectedString);
    });
  });
});

Then("{string} should be displayed on the login page.", (expectedString) => {
  core.readFile(userDataFixture).then(function (users) {
    users.forEach((user) => {
      loginPage.magicLogin(user);
      //loginPage.validateFail(expectedString);
    });
  });
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

Then("/login request should give {int} status code.", (_statusCode) => {
  core.waitForObject("@login").then((resolve) => {
    expect(resolve.response.statusCode).to.eq(_statusCode);
  });
});

Then("/login request should give {int} Unauthorized status code.", (_statusCode) => {
  core.waitForObject("@login").then((resolve) => {
    expect(resolve.response.statusCode).to.eq(_statusCode);
  });
}
);

And("Logout button can be clicked on the Welcome Page.", () => {
  core.getCurrentUrl(welcomeURI);
  welcomePage.clickLogoutButton();
});