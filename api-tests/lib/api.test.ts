import * as request from 'supertest';

import {booking} from '../../test-framework-lib/test-factories/index';

const API_BASE_URL = process.env['API_BASE_URL'];

describe('Hotel Room Booking System', () => {
  describe('Scenario: Listing all bookings', () => {
    let response: any;
    beforeEach(async () => {
      response = await getBookings();
    });
    describe('Given there are already bookings in the system', () => {
      it('Then all bookings should be listed', async () => {
        expect(response.body.length).toBeGreaterThan(0);
      });
      it('And the response code should be 200 OK', async () => {
        expect(response.statusCode).toEqual(200);
      });
    });
  });

  describe('Scenario: Adding a booking to the system', () => {
    let bookings: any;
    let numberOfBookings: number;
    let response: any;
    beforeEach(async () => {
      bookings = await getBookings();
      numberOfBookings = bookings.body.length;
      response = await createBooking();
    });
    describe('Given the users fills all required fields correctly', () => {
      describe('When the booking is saved', () => {
        it('Then they should be able to see the new booking', async () => {
          const newNumBookings = (await getBookings()).body.length;
          expect(newNumBookings).toEqual(numberOfBookings + 1);
        });
        it('And the response code shoud be a 201 Created', async () => {
          expect(response.statusCode).toEqual(201);
        });
      });
    });
  });

  describe('Scenario: Deleting a booking from the system', () => {
    let bookings: any;
    let numberOfBookings: number;
    let bookingId: number;
    let response: any;

    beforeEach(async () => {
      const createResp = await createBooking();
      bookings = await getBookings();
      numberOfBookings = bookings.body.length;
      bookingId = createResp.body.bookingid;
      response = await deleteBooking(bookingId);
    });

    describe('Given there is a booking that needs deleting ', () => {
      describe('When the user deletes the booking', () => {
        it('Then the booking should be removed', async () => {
          const newNumBookings = (await getBookings()).body.length;
          expect(newNumBookings).toEqual(numberOfBookings - 1);
        });
        it('And the response code should be 200 OK', async () => {
          expect(response.statusCode).toEqual(200);
        });
      });
    });
  });
});


// These functions could be moved to the test-framework-lib
// They can then be shared across UI and API tests for creating state
// The test-framework is the start of a shared libaray of components

const getBookings = async () => {
  return await request(API_BASE_URL)
      .get('/booking')
      .set('Accept', 'application/json');
};

const createBooking = async () => {
  const fakeBooking = booking();
  return await request(API_BASE_URL)
      .post('/booking')
      .send(fakeBooking)
      .set('Accept', 'application/json');
};

const deleteBooking = async (id: number) => {
  return await request(API_BASE_URL)
      .delete(`/booking/${id}`)
      .set('Accept', 'application/json');
};
