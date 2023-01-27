# cypressframework (Cucumber + Cypress + GitHub Actions + Docker)
This cypress framework automatically attaches screenshots to failed cucumber steps so that they will appear on Cucumber reports.
## Installation :

1. Download this project and type below commands in the terminal: 
	```bash
	npm install
	```
2. How to run the bundled tests from CLI:
	```bash
	npm run cy:scripts
	```
3. How to run the bundled tests from Cypress Test Runner:
	```bash
	npm run cy:open
	```

## Steps to contribute to this framework:
1. Clone this repository from GitLab into your local desktop.
2. Create a feature branch(using git-flow library commands) from develop branch:
	```bash
	git flow feature start <feature_branch_name>
	```
3. 	Make your changes and commit them:
	```
	git commit -m '<commit_message>'
	```
4. Push to the original branch: 
	```
	git flow feature finish <feature_branch_name>.
	```
5. Create a pull request and assign to your reviewer.

## Cucumber/gherkin-syntax
You can follow the documentation below, or if you prefer to hack on a working example, take a look at https://github.com/TheBrainFamily/cypress-cucumber-example

## Visual Studio Code
To get vscode to resolve your steps, install the Cucumber (Gherkin) Full Support extension from the marketplace.