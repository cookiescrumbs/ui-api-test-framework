import {Booking} from '../types';

export const booking = (checkIn='2050-01-03', checkOut='2050-01-14'): Booking => {
  return {
    firstname: 'Jimi',
    lastname: 'Hendrix',
    totalprice: 200.45,
    depositpaid: true,
    bookingdates: {
      checkin: checkIn,
      checkout: checkOut,
    },
  };
};

export const dateInFuture = (days=1) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
};
