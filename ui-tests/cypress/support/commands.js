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
  cy.get('#form > .row > :nth-child(7) > input').click({force: true});
});

Cypress.Commands.add('fillBookingSurname', (name) => {
  cy.get('#lastname').type(name);
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

Cypress.Commands.add('interceptDeleteBooking', (id, alias='deleteBooking') => {
  cy.intercept('DELETE', `/booking/${id}`).as(alias);
});

Cypress.Commands.add('responseHasStatusCode', (alias, statusCode) => {
  cy.wait(`@${alias}`).its('response.statusCode').should('eql', statusCode);
});

Cypress.Commands.add('deleteBooking', (id) => {
  return cy.get(`#${id} input`, {timeout: 10000}).click();
});

Cypress.Commands.add('fillInBookingForm', (fakeBooking) => {
  cy.get('#firstname').type(fakeBooking.firstname);
  cy.get('#lastname').type(fakeBooking.lastname);
  cy.get('#totalprice').type(fakeBooking.totalprice.toString());
  cy.get('#depositpaid').select(fakeBooking.depositpaid.toString());
  cy.get('#checkin').type(fakeBooking.bookingdates.checkin, {force: true});
  cy.get('#checkout').type(fakeBooking.bookingdates.checkout, {force: true});
});
