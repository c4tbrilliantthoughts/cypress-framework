import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import loginPage from "../../../framework/Pages/LoginPage";
import welcomePage from "../../../framework/Pages/WelcomePage";
import core from "../../../framework/Utils/CoreFunctions";

const username = Cypress.env("username");
const password = Cypress.env("password");
const loginURI = Cypress.env("loginURI");
const welcomeURI = Cypress.env("welcomeURI");
const userDataFixture = Cypress.env("userDataFixture");
const employeeDataFixture = Cypress.env("employeeDataFixture");

Given("A user is logged into the Swimlane application.", () => {
  core.visit(loginURI);
  loginPage.usernameInput(username).passwordInput(password).login();
});

When("A user is on the Welcome Page.", () => {
  core.getCurrentUrl(welcomeURI);
});

Then("WelcomePage title must contain {string}.", (pageTitle) => {
  welcomePage.getTitle(pageTitle);
});

When("A user clicks a new record and provides below employee details in the form page.", (dataTable) => {
  let employees = [];
  dataTable.rawTable.slice(1).forEach((employee, index) => {
    const [FirstName, LastName, City, ZipCode] = employee;
    employees.push({ FirstName, LastName, City, ZipCode, });
  });
  core.writeFile(employeeDataFixture, JSON.stringify(employees));
});