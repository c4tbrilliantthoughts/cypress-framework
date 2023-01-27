import core from "../Utils/CoreFunctions";

const POST = Cypress.env("postMethod");
const loginURL = Cypress.env("apiserver") + Cypress.env("loginApiURI");
const body = {
  username: Cypress.env("username"),
  password: Cypress.env("password"),
};

class UserAPI {
  /* Singleton Pattern for single instance creation. */
  constructor() {
    if (UserAPI._instance) return UserAPI._instance;
    UserAPI._instance = this;
  }

  /* Login user API implementation */
  userLoginRequest() {
    return core.request(POST, loginURL, body);
  }
}

/* Create an instance and export. */
const userAPI = new UserAPI();
export default userAPI;
