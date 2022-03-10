// Import commands.js using ES2015 syntax:
import './commands';

// load type definitions that come with Cypress module
// / <reference types="cypress" />
declare global {
  // eslint-disable-next-line no-unused-vars
  namespace Cypress {
    // eslint-disable-next-line no-unused-vars
    interface Chainable {
      containsAllBookingFields(selector: string, booking: any): void;
      stubBookings(alias: string): void;
      stubBooking(id: string, alias: string): void;
      hasAllBookings(numberOfBookings: number): void;
      clickSaveBooking(): void;
      interceptSaveBooking(alias: string): void;
      responseHasStatusCode(alias: string, statusCode: number): void;
    }
  }
}
