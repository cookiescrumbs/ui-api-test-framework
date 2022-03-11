// / <reference types="cypress" />
import {Booking} from '../../../test-framework-lib/types';

describe('Hotel Booking - e2e', () => {
  context('Successfully Adding and deleting a booking', () => {
    const fakeBooking: Booking = {
      firstname: 'Sybil',
      lastname: 'Snee',
      totalprice: '123.45',
      depositpaid: 'false',
      checkin: '2030-02-03',
      checkout: '2030-02-06',
    };

    beforeEach(() => {
      cy.visit('/');
      cy.interceptSaveBooking('saveBooking');
      cy.fillInBookingForm(fakeBooking);
      cy.clickSaveBooking();
    });

    describe.only('Scenario: Adding a booking to the system', () => {
      describe('Given the users fills all required fields correctly', () => {
        describe('When the booking is saved', () => {
          it('Then they should be able to see the new booking', () => {
            cy.wait('@saveBooking').then((inter) => {
              const id = inter.response.body.bookingid;
              const statusCode = inter.response.statusCode;
              cy.deleteBooking(id);
              expect(statusCode).to.eql(200);
            });
          });
        });
      });
    });

    describe('Scenario: Deleting a booking from the system', () => {
      describe('Given there is a booking that needs deleting ', () => {
        describe('When the user deletes the booking', () => {
          it('Then the booking should be removed', () => {
            cy.wait('@saveBooking')
                .then((inter) => {
                  return inter.response.body.bookingid;
                })
                .then((id) => {
                  cy.interceptDeleteBooking(id, 'deleteBooking');
                  cy.deleteBooking(id);
                });
            cy.wait('@deleteBooking')
                .its('response.statusCode')
                .should('eql', 201);
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
        it('Then they can\'t complete the booking', () => {
          cy.clickSaveBooking();
          cy.responseHasStatusCode('saveBooking', 500);
        });
      });
    });

    describe('Scenario: Filling only one of the fields', () => {
      describe(`Given the user completes all 
        required booking fields apart from the "Surname"`, () => {
        it('Then they can\'t complete the booking', () => {
          cy.fillBookingSurname('Morrison');
          cy.clickSaveBooking();
          cy.responseHasStatusCode('saveBooking', 500);
        });
      });
    });
  });
});
