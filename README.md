passport-reg
============

Registration and login with Passport.

## Environment Variables

Required:

* NODE_ENV - 'development' or 'production'
* DOMAIN - the domain to return requests from, e.g. 'localhost' for local testing; primarily needed for PayPal functionality
* PORT - the port to listen on
* PAYPALEC_USERNAME - username for the business' PayPal API access
* PAYPALEC_PASSWORD - password for the business' PayPal API access
* PAYPALEC_SIGNATURE - signature for the business' PayPal API access
