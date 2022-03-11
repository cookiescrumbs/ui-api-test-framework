# UI and Contract test framework
 
## Usage

If you just want to run the tests you only need docker. [Install Docker Desktop](https://docs.docker.com/engine/install/) 🐳

☠️ **Running the tests using Docker will not work on the Apple M1 ARM64 Processor** ☠️

If you have an M1, you'll need to follow the **Local Development** steps. 🙏🏻

##### Run the UI test in an Docker container 
```
docker-compose run ui-tests npm run test
```

### Local development

[First, you'll need to install node....](https://nodejs.dev/learn/how-to-install-nodejs) 🤖

I like to use [FNM](https://github.com/Schniz/fnm) 👨🏻‍💻  and the Node Version is **16.14.0**
 
To setup the local development for this framework you can run 🐢 💨
 
```bash
npm run setup-local-dev
```
 
This will install dependencies for you to work on the UI and API tests locally.
 
##### Run the UI test in headless mode via Cypress
 
```bash
npm run ui-tests:run
```
 
##### Open the UI tests in the Cypress GUI
 
```bash
npm run ui-tests:open
```

### Feature File .. but no cucumber?! 🥒

You'll find a feature file in the root of the project that outlines the scenarios that have been tested. 
This file is written in Gherkin but you'll find no cucmber 🥒  steps in the tests.

I've used the Gherkin syntax to outline the acceptance critera. I find that it can be a good tool for defining the requirements of a new feature ideally in 
3 Amigo session.