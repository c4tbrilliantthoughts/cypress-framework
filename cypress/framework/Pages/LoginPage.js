import core from "../Utils/CoreFunctions.js";
const locator = require("../PagesJSON/loginPage.json");

class LoginPage {
  /* Singleton Pattern for single instance creation. */
  constructor() {
    if (LoginPage._instance) return LoginPage._instance;
    LoginPage._instance = this;
  }

  /* Input userId credential. */
  usernameInput(username) {
    core.type(locator.usernameInputLocator, username);
    return this;
  }

  /* Input password credential. */
  passwordInput(password) {
    core.typeSensitive(locator.passwordInputLocator, password);
    return this;
  }

  /* Click login button. */
  login() {
    core.findElement(locator.loginButtonLocator).click();
    return this;
  }

  /* Magic login. */
  magicLogin(emailId) {
    core.type(locator.usernameInputLocator, emailId, locator.enterSequence);
    return this;
  }

  /* Login page error validations. */
  validateFail(expectedText) {
    core.get(locator.loginErrorTextLocator).then(($element) => {
      const actualText = $element.text();
      expect(actualText).to.include(expectedText);
    });
  }

  /* Login page success validations. */
  validatePass(expectedText) {
    core.get(locator.welcomePageTextLocator).then(($element) => {
      const actualText = $element.text();
      expect(actualText).to.include(expectedText);
    });
  }

  /* Login using API session */
  loginViaAPISession(username, password) {
    cy.session(
      [username, password],
      () => {
        core
          .request({
            method: "POST",
            url: Cypress.env("apiserver") + Cypress.env("loginApiURI"),
            body: {
              username: username,
              password: password,
            },
          })
          .then((res) => {
            expect(res.status).to.eq(200);
            window.localStorage.setItem("token", JSON.stringify(res.body));
          });
      },
      {
        validate() {
          core.visit("/");
          cy.get("div > img").should("be.visible");
        },
      }
    );
  }
}

/* Create an instance and export. */
const loginPage = new LoginPage();
export default loginPage;
