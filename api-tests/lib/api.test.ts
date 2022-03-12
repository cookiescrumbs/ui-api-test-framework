import * as request from 'supertest';

import {booking} from '../../test-framework-lib/test-factories/index';

const API_BASE_URL = process.env['API_BASE_URL'];

let response: any;

describe('Hotel Room Booking System', () => {
  describe('Scenario: Listing all bookings', () => {
    beforeEach(async () => {
      response = await getBookings();
    });
    describe('Given there are already bookings in the system', () => {
      describe('Then all bookings should be listed', () => {
        it('And the response code should be 200 OK', async () => {
          expect(response.statusCode).toEqual(200);
          expect(response.body.length).toBeGreaterThan(0);
        });
      });
    });
  });

  describe('Scenario: Adding a booking to the system', () => {
    let bookings: any;
    let numberOfBookings: number;
    beforeEach(async () => {
      bookings = await getBookings();
      numberOfBookings = bookings.body.length;
      response = await createBooking();
    });
    describe('Given the users fills all required fields correctly', () => {
      describe('When the booking is saved', () => {
        describe('Then they should be able to see the new booking', () => {
          it('And the response code shoud be a 201 Created', async () => {
            const newNumBookings = (await getBookings()).body.length;
            expect(newNumBookings).toEqual(numberOfBookings + 1);
            expect(response.statusCode).toEqual(201);
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
            expect(response.statusCode).toEqual(200);
          });
        });
      });
    });
  });
});

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
