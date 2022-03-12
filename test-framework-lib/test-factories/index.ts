import { Booking } from "../types";

export const booking = (): Booking => {
  return {
    firstname: "Jimi",
    lastname: "Hendrix",
    totalprice: 200.45,
    depositpaid: true,
    bookingdates: {
      checkin: "2050-01-03",
      checkout: "2050-01-14",
    },
  };
};
