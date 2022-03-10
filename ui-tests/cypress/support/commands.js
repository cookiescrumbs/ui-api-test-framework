Cypress.Commands.add('containsAllBookingFields', (selector, booking) => {
  const bookingInfo = [
    booking.firstname,
    booking.lastname,
    booking.totalprice,
    booking.depositpaid,
    booking.bookingdates.checkin,
    booking.bookingdates.checkout,
  ];
  bookingInfo.map((info) => {
    cy.get(`${selector}`).contains(`${info}`);
  });
});

Cypress.Commands.add('hasAllBookings', (numberOfBookings) => {
  const totalNumberOfBookings = numberOfBookings + 1;
  cy.get('#bookings .row').should('have.length', totalNumberOfBookings);
});

Cypress.Commands.add('clickSaveBooking', () => {
  cy.get('#form > .row > :nth-child(7) > input').click();
});

Cypress.Commands.add('stubBooking', (id, alias) => {
  cy.fixture(id).then((json) => {
    cy.intercept('GET', `/booking/${id}`, json).as(alias);
  });
});

Cypress.Commands.add('stubBookings', (alias='bookings') => {
  cy.fixture('booking').then((json) => {
    cy.intercept('GET', '/booking', json).as(alias);
  });
});

Cypress.Commands.add('interceptSaveBooking', (alias='saveBooking') => {
  cy.intercept('POST', '/booking').as(alias);
});

Cypress.Commands.add('responseHasStatusCode', (alias, statusCode) => {
  cy.wait(`@${alias}`).its('response.statusCode').should('eql', statusCode);
});


