/**********************************************
This example commands.js shows you how to
create various custom commands and overwrite
existing commands.

For more comprehensive examples of custom
commands please read more here:
https://on.cypress.io/custom-commands
***********************************************/

/* To mask sensitive information on Test runner while typing */
Cypress.Commands.overwrite("type", (originalFn, element, text, options) => {
  if (options && options.sensitive) {
    /* turn off original log */
    options.log = false;
    /* create our own log with masked message */
    Cypress.log({
      $el: element,
      name: "type",
      message: "*".repeat(text.length),
    });
  }

  return originalFn(element, text, options);
});

/* Case insensitive comparision when using cy.contain */
Cypress.Commands.overwrite(
  "contains",
  (originalFn, subject, filter, text, options = {}) => {
    // determine if a filter argument was passed
    if (typeof text === "object") {
      options = text;
      text = filter;
      filter = undefined;
    }
    options.matchCase = false;
    return originalFn(subject, filter, text, options);
  }
);

/* Get Text Value Command */
Cypress.Commands.add(
  "getText",
  {
    prevSubject: "element",
  },
  (prevSub) => {
    // return prevSub.text();
    cy.wrap(prevSub.text());
  }
);

/* Get Table Cell Value */
Cypress.Commands.add("getCellValue", (row, col) => {
  cy.get(`table#table1>tbody>tr:nth-child(${row})>td:nth-child(${col})`).then(
    (el) => {
      cy.wrap(el.text());
    }
  );
});

/* Get the body of iFrame */
Cypress.Commands.add(
  "iframe",
  {
    prevSubject: "element",
  },
  (iframe) => {
    return new Cypress.Promise((resolve) => {
      iframe.ready(() => {
        resolve(iframe.contents().find("body"));
      });
    });
  }
);
