# UI and API test framework
 
## Usage

If you just want to run the tests you only need docker. [Install Docker Desktop](https://docs.docker.com/engine/install/) 🐳

#### Run the UI tests in an Docker container 

If you have an M1, you'll need to run this command  `docker compose run ui-tests-m1 npm run test` 🏃🏿

If you are on the old school Mac or anything that isn't ARM64 then you'll need to run this

`docker-compose run ui-tests npm run test` 🏃‍♀️


#### Run the API tests in an Docker container 

`docker-compose run api-tests npm run test` 🏃‍♀️


### Local development

[First, you'll need to install node....](https://nodejs.dev/learn/how-to-install-nodejs) 🤖

I like to use [FNM](https://github.com/Schniz/fnm) 👨🏻‍💻  and the Node Version is **16.14.0**
 
To setup the local development for this framework you can run 🐢 💨
 
```bash
npm run setup-local-dev
```

This will install dependencies for you to work on the UI and API tests locally.
 
#### Run the UI test in headless mode via Cypress 🏃🏻‍♂️
 
```bash
npm run ui-tests:run
```
 
#### Open the UI tests in the Cypress GUI 🏃‍♀️
 
```bash
npm run ui-tests:open
```

#### Run the API tests 🏃🏿
 
```bash
npm run api-tests:run
```


### Feature File .. but no cucumber?! 🥒

You'll find a feature file in the root of the project that outlines the scenarios that have been tested. 
This file is written in Gherkin but you'll find no cucmber 🥒  steps in the tests.

I've used the Gherkin syntax to outline the acceptance critera. I find that it can be a good tool for defining the requirements of a new feature ideally in 
[3 Amigos session](https://www.agilealliance.org/glossary/three-amigos/#q=~(infinite~false~filters~(postType~(~'page~'post~'aa_book~'aa_event_session~'aa_experience_report~'aa_glossary~'aa_research_paper~'aa_video)~tags~(~'three*20amigos))~searchTerm~'~sort~false~sortDirection~'asc~page~1)) 🧟‍♀️  🧙🏻‍♀️ 🦹🏻‍♀️ 


### Issues 👻

☠️ **Running Cypress inside a Docker container using an Apple M1 ARM64 Processor has some issues** ☠️

I've managed to solve the issue by creating a Docker image just for ARM64, as suggested on this [github thread](https://github.com/cypress-io/cypress-docker-images/issues/431)

The Docker image can be found here [cookiescrumbs/cypress-m1:9.4.1](https://hub.docker.com/repository/docker/cookiescrumbs/cypress-m1)

The image has Cypress v9.4.1 baked into it. 🎂
