// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //Clee public CAPTCHA
  CAPTCHA_publicKey : "6Lc0I9waAAAAAHlUtmgGZyH42D_c3E3KIDyBE5kM",
  //URI 
  URI : "http://localhost:5000",
  //STRIPE Publishable key
  STRIPE_publishableKey: "pk_test_51IzMHNDBVMyYt29bur5sGTE0y34kVEgOMIBgqNPgore2l4XDOZbcg0qaW6mewLOGibx0VqMTpIYVutQYtJYkKcyQ00w8pS0fSc",
  //PRIX
  STRIPE_prix: "price_1J9b1XDBVMyYt29b647ccd3E",
  //URL_FRONT
  URI_FRONT : 'http://localhost:4200'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
