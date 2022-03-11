import * as request from 'supertest';

const API_BASE_URL = process.env['API_BASE_URL'];

let response: any;

describe('Hotel Room Booking System', () => {
  describe('Scenario: Listing all bookings', () => {
    beforeEach(async () => {
      response = await getBookings();
    });
    describe('Given there are already bookings in the system', () => {
      test('Then all bookings should be listed', async () => {
        expect(response.statusCode).toEqual(200);
        expect(response.body.length).toBeGreaterThan(0);
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
    describe('Given the users fills all required fields correclty', () => {
      describe('When the booking is saved', () => {
        test('Then they should be able to see the new booking', async () => {
          const newNumBookings = (await getBookings()).body.length;
          expect(response.statusCode).toEqual(200);
          expect(newNumBookings).toEqual(numberOfBookings + 1);
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
  return await request(API_BASE_URL)
      .post('/booking')
      .send({
        firstname: 'Jimi',
        lastname: 'Hendrix',
        totalprice: 200.45,
        depositpaid: true,
        bookingdates: {
          checkin: '2050-01-03',
          checkout: '2050-01-14',
        },
      })
      .set('Accept', 'application/json');
};
