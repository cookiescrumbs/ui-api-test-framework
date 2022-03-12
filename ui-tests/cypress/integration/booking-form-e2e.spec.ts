// / <reference types="cypress" />
import { booking } from '../../../test-framework-lib/test-factories/index';


describe('Hotel Booking - e2e', () => {
  context('Successfully Adding and deleting a booking', () => {
    const fakeBooking = booking();

    beforeEach(() => {
      cy.visit('/');
      cy.interceptSaveBooking('saveBooking');
      cy.fillInBookingForm(fakeBooking);
      cy.clickSaveBooking();
    });

    describe('Scenario: Adding a booking to the system', () => {
      describe('Given the users fills all required fields correctly', () => {
        describe('When the booking is saved', () => {
          describe('Then they should be able to see the new booking', () => {
            it('And the response code shoud be a 201 Created', () => {
              cy.wait('@saveBooking').then((inter) => {
                const id = inter.response.body.bookingid;
                const statusCode = inter.response.statusCode;
                cy.get(`#${id}`, {timeout: 10000}).should('exist');
                cy.deleteBooking(id).then(() => {
                  expect(statusCode).to.eql(201);
                });
              });
            });
          });
        });
      });
    });

    describe('Scenario: Deleting a booking from the system', () => {
      describe('Given there is a booking that needs deleting ', () => {
        describe('When the user deletes the booking', () => {
          describe('Then the booking should be removed', () => {
            it('And the response code should be 200 OK', () => {
              cy.wait('@saveBooking')
                  .then((inter) => {
                    return inter.response.body.bookingid;
                  })
                  .then((id) => {
                    cy.interceptDeleteBooking(id, 'deleteBooking');
                    cy.deleteBooking(id);
                  });
              cy.wait('@deleteBooking').then((inter) => {
                const id = inter.response.body.bookingid;
                const statusCode = inter.response.statusCode;
                cy.get(`#${id}`, {timeout: 10000}).should('not.exist');
                expect(statusCode).to.eql(200);
              });
            });
          });
        });
      });
    });
  });

  context('Unsuccessfully adding a booking', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.interceptSaveBooking('saveBooking');
    });

    describe('Scenario: Failing to supply all the fields', () => {
      describe(`Given the user doesn\'t 
        provide all the booking details`, () => {
        describe('Then they can\'t complete the booking', () => {
          it('And the response code should be 400 Bad Request', () => {
            cy.clickSaveBooking();
            cy.responseHasStatusCode('saveBooking', 400);
          });
        });
      });
    });

    describe('Scenario: Filling only one of the fields', () => {
      describe(`Given the user completes all 
        required booking fields apart from the "Surname"`, () => {
        describe('Then they can\'t complete the booking', () => {
          it('And the response code should be 400 Bad Request', () => {
            cy.fillBookingSurname('Morrison');
            cy.clickSaveBooking();
            cy.responseHasStatusCode('saveBooking', 400);
          });
        });
      });
    });
  });
});
