Feature: Hotel Room Booking System
 
The Hotel booking system is aimed at our sales team so that they can make room bookings for our guests.
 
Scenario: Listing all bookings
   Given there are already bookings in the system
   Then all bookings should be listed
   And the response code should be 200 OK
 
Scenario: Details of an individual booking
   Given there is a bookings in the system
   Then the booking should contain the "Firstname", "Surname", "Price", "Deposit", "Check-in" and "Check-out"
 
Scenario: Failing to supply all the fields
   Given the user doesn't provide all the booking details
   Then they can't complete the booking
   And the response code should be 400 Bad Request
 
Scenario: Filling only one of the fields
   Given the user completes all required booking fields apart from the "Surname"
   Then they can't complete the booking
   And the response code should be 400 Bad Request
 
Scenario: Adding a booking to the system
   Given the users fills all required fields correctly
   When the booking is saved
   Then they should be able to see the new booking
   And the response code shoud be a 201 Created
 
Scenario: Deleting a booking from the system
   Given there is a booking that needs deleting
   When the user deletes the booking
   Then the booking should be removed
   And the response code should be 200 OK
  
@not-implimented
Scenario: Editing an existing booking
   Given there is a booking that requires editing
   When the user edits the booking
   Then the booking should amended
   And the response code should be 200 OK
   