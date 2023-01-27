import core from "../Utils/CoreFunctions";
const locator = require("../PagesJSON/welcomePage.json");

class WelcomePage {
  /* Singleton Pattern for single instance creation. */
  constructor() {
    if (WelcomePage._instance) return WelcomePage._instance;
    WelcomePage._instance = this;
  }

  /* Get page Title */
  getTitle(pageTitle) {
    return core.findElement(locator.pageTitleLocator).then(($element) => {
      expect($element.text().trim()).to.eq(pageTitle);
    });
  }

  /* Click Logout Button */
  clickLogoutButton() {
    core.findElement(locator.userProfileLocator).click({ force: true });
    core.findElement(locator.logoutLocator).click();
  }

  /* Click Home Button */
  clickHomeButton() {
    return core.get(locator.navigationMenuLocator);
  }
}

/* Create an instance and export. */
const welcomePage = new WelcomePage();
export default welcomePage;
