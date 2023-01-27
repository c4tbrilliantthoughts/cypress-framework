import { And, Given, Then } from "cypress-cucumber-preprocessor/steps";
import core from "../../../framework/Utils/CoreFunctions";
import userAPI from "../../../framework/Pages/UserAPI";
import recordAPI from "../../../framework/Pages/RecordAPI";

Then("Make a POST call to add a competency and validate its response.", () => {
  userAPI.userLoginRequest().then((userLoginResponse) => {
    recordAPI.createRecordRequest(userLoginResponse);
  });
});

Then("Make a GET call to fetch saved competencies and validate its response.", () => {
  userAPI.userLoginRequest().then((userLoginResponse) => {
    recordAPI.getRecordRequest(userLoginResponse);
  });
});

Then("Make a DELETE call to remove competency and validate its response.", () => {
  userAPI.userLoginRequest().then((userLoginResponse) => {
    recordAPI.deleteRecordRequest(userLoginResponse);
  });
});
