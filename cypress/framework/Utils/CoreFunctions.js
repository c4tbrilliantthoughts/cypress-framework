class CoreFunctions {
  /* Singleton Pattern for single instance creation. */
  constructor() {
    if (CoreFunctions._instance) return CoreFunctions._instance;
    CoreFunctions._instance = this;
  }

  /* Log data on test runner. */
  log(text) {
    return cy.log(text);
  }

  /* Navigate to url. */
  visit(url) {
    return cy.visit(url, { failOnStatusCode: false });
  }

  /* Create a session on any Https call for faster test execution. */
  session(method, url, body) {
    return cy.session(method, url, body);
  }

  /* Make any Https call . */
  request(method, url, body) {
    return cy.request(method, url, body);
  }

  /* Intercept any Https call and assign an alias name. */
  intercept(query, alias) {
    return cy.intercept(query).as(alias);
  }

  /* Stop current thread execution. */
  sleep(number) {
    return cy.wait(number);
  }

  /* Wait for a number of milliseconds or wait for an aliased resource to resolve before moving on to the next command. */
  waitForObject(alias) {
    return cy.wait(alias);
  }

  /* Find DOM element by selector in the current landing page. */
  findElement(locator) {
    return cy.get(locator);
  }

  /* Get DOM element by alias in an Async call. */
  get(alias) {
    return cy.get(alias);
  }

  /* Type text in the webelement locator in the current landing page. */
  type(locator, text, sequence) {
    this.findElement(locator).clear().type(text + sequence);
    return this;
  }

  /* Mask sensitive text in the webelement locator in the current landing page. */
  typeSensitive(locator, text, sequence) {
    this.findElement(locator).clear().type(text, { sensitive: true });
    return this;
  }

  /* Saves a file in the desired path/directory */
  writeFile(filePath, contents) {
    return cy.writeFile(filePath, contents);
  }

  /* Reads a file from the desired path/directory */
  readFile(filePath) {
    return cy.readFile(filePath);
  }

  /* Get current URL of the landing page. */
  getCurrentUrl(label) {
    return cy.url().should("contain", label);
  }
}

/* Create an instance and export. */
const core = new CoreFunctions();
export default core;
