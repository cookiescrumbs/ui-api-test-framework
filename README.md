# UI and Contract test framework
 
## Usage

If you just want to run the tests you only need docker. [Install Docker Desktop](https://docs.docker.com/engine/install/) 🐳

☠️ **Please note ... Runnning the tests using Docker will not work on the Apple M1 ARM64** ☠️

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


