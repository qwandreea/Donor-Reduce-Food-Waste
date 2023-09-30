# Reduce Food Waste - Donor

## Brief description
The idea behind this project stemmed from the observation that a significant quantity of purchased food products ends up being discarded right from one's own household, without a readily available method for reusing them for charitable purposes or even for saving or recovering a certain amount of money.

The objective of this project is to create a simple and user-friendly application that stores information about food products in a suitable condition for donation or optional purchase at a greatly reduced price, and then redistributes them to organizations, food banks, or individuals in need, following a sustainable approach.

Donor takes into account several stakeholders who can benefit from the functionalities provided: users, businesses, and volunteers
## Installation
Start the backend server. Then, launch the frontend using the `npm start` command.
## Database schema
![](./frontend/screenshots/db.png)

## Usage

Multilingual component <br/>
![](./frontend/screenshots/header.png)

Homepage includes statistics about activity within the application and various information.

![](./frontend/screenshots/menu.png)

Exploration of the menu with options for checking details and making reservations. Products with expiration dates that have passed the current date become inactive and disappear from the interface. Navigation is done by category or other filters.

![](./frontend/screenshots/explore.png)

User registration also includes an extension to allow users to sign up as volunteers. All fields are mandatory, and there are validations for the phone number and email format, as well as their existence. The registration window for businesses uses an API to pre-fill fields based on the entered CIF.

![](./frontend/screenshots/register.png)

1. User page <br/>
Listing an item. Validation does not allow listing an item after its expiration date has passed. Submitting the form is not allowed if the donor does not ensure quality and hygiene. The form allows the insertion of a title, a description, a product's condition, along with an image, quantity, measurement unit, and other details. <br/>
![](./frontend/screenshots/listing%20form.png)

Updating personal information or setting preferred pickup addresses.
![](./frontend/screenshots/user%20setting.png)

The listed items of a donor, with options for activation/deactivation or modifying an item.

![](./frontend/screenshots/listing.png)

User reservations with the option to check item details and cancel a reservation

![](./frontend/screenshots/reservations.png)

2. Volunteer page <br/>
The page displaying the catalog of products provided by businesses for volunteers.
![](./frontend/screenshots/volunteer%20explore.png)


Once volunteers send their request, business users approve or reject it. Volunteers receive the status of the request through the 'My Requests' window, where they can schedule a pickup time for the requested package.
![](./frontend/screenshots/volunteer%20requests%20status.png)

3. Business page <br/>
The section for item requests from volunteers, accessible to business users. They have the option to view a list of received requests, including details of the volunteer and the requested items. For each request, businesses can choose to accept or reject them.
![](./frontend/screenshots/volunteer%20requests.png)