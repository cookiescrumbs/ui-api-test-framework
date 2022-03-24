
# Hotel Booking



## Task 1 - Manual testing

Here are the manual test senarios performed on the Hotel Booking application

```gherkin
Feature: Hotel Room Booking System
 
The Hotel booking system is aimed at our sales team so that they can make room bookings for our guests.
 
Scenario: Listing all bookings
   Given there are already bookings in the system
   Then all bookings should be listed
   And the response code should be 200 OK
 
Scenario: Details of an individual booking
   Given there is a bookings in the system
   Then the booking should contain the "Firstname", "Surname", "Price", "Deposit", "Check-in" and "Check-out"
 
Scenario: Failing to supply all the fields
   Given the user doesn't provide all the booking details
   Then they can't complete the booking
   And the response code should be 400 Bad Request
 
Scenario: Filling only one of the fields
   Given the user completes all required booking fields apart from the "Surname"
   Then they can't complete the booking
   And the response code should be 400 Bad Request
 
Scenario: Adding a booking to the system
   Given the users fills all required fields correctly
   When the booking is saved
   Then they should be able to see the new booking
   And the response code shoud be a 201 Created
 
Scenario: Deleting a booking from the system
   Given there is a booking that needs deleting
   When the user deletes the booking
   Then the booking should be removed
   And the response code should be 200 OK
  
@not-implimented
Scenario: Editing an existing booking
   Given there is a booking that requires editing
   When the user edits the booking
   Then the booking should amended
   And the response code should be 200 OK
```


# Task 2 - Test automation

Please find the test framework written to automate the manaual test regression.

**The automation tests the Front End app works as expected and that the HTTP response codes returned from the API are also correct.**

**The HTTP codes returned from the API are incorrect thus the e2e test fail**


## UI and API test framework

This test framework uses [Cypress](https://www.cypress.io/) for e2e testing the UI and [SuperTest](https://github.com/visionmedia/supertest) & [Jest](https://jestjs.io) to test the API.
All code is written in [Typescript](https://www.typescriptlang.org).

There is some [Docker](https://www.docker.com/) & [Docker compose](https://docs.docker.com/compose/) 🐳  to run the tests locally in containers or via your CI/CD platform.

## Usage

If you just want to run the tests you only need docker. [Install Docker Desktop](https://docs.docker.com/engine/install/) 🐳

#### Run the UI tests in a Docker container 

If you have an M1, you'll need to run this command  `docker compose run ui-tests-m1 npm run test` 🏃🏿

If you are on the old school Mac or anything that isn't ARM64 then you'll need to run this

`docker-compose run ui-tests npm run test` 🏃‍♀️


#### Run the API tests in a Docker container 

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

I've used the Gherkin syntax to outline the acceptance critera. I find that it can be a good tool for defining the requirements of a new feature ideally in a 
[3 Amigos session](https://www.agilealliance.org/glossary/three-amigos/#q=~(infinite~false~filters~(postType~(~'page~'post~'aa_book~'aa_event_session~'aa_experience_report~'aa_glossary~'aa_research_paper~'aa_video)~tags~(~'three*20amigos))~searchTerm~'~sort~false~sortDirection~'asc~page~1)) 🧟‍♀️  🧙🏻‍♀️ 🦹🏻‍♀️ 


### Issues 👻

☠️ **Running Cypress inside a Docker container using an Apple M1 ARM64 Processor has some issues** ☠️

I've managed to solve the issue by creating a Docker image just for ARM64, as suggested on this [github thread](https://github.com/cypress-io/cypress-docker-images/issues/431)

The Docker image can be found here [cookiescrumbs/cypress-m1:9.4.1](https://hub.docker.com/repository/docker/cookiescrumbs/cypress-m1)

The image has Cypress v9.4.1 baked into it. 🎂
