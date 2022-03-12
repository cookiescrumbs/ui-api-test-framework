// / <reference types="cypress" />

context('Hotel Booking - isolated', () => {
  const firstBookingId = '67620';
  const secondBookingId = '67621';
  beforeEach(() => {
    cy.stubBookings('bookings');
    cy.stubBooking(firstBookingId, 'firstBooking');
    cy.stubBooking(secondBookingId, 'secondBooking');
    cy.visit('/');
  });

  describe('Scenario: Listing all bookings', () => {
    describe('Given there are already bookings in the system', () => {
      it('Then all bookings should be listed', () => {
        cy.wait(['@bookings', '@firstBooking', '@secondBooking']).then(
            (intercepted) => {
              const numOfBookings = intercepted[0].response.body.length;
              cy.hasAllBookings(numOfBookings);
            },
        );
      });
    });
  });

  describe('Scenario: Details of an individual booking', () => {
    describe('Given there is a booking in the system', () => {
      it(`Then the booking should contain the
         "Firstname", "Surname", "Price", 
         "Deposit", "Check-in" and "Check-out"`, () => {
        cy.wait(['@bookings', '@firstBooking', '@secondBooking']).then(
            (intercepted) => {
              const firstBooking = intercepted[1].response.body;
              cy.containsAllBookingFields(
                  `#bookings #${firstBookingId}`,
                  firstBooking,
              );
            },
        );
      });
    });
  });
});
