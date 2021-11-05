// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  instagram_token: 'INSTA_TOKEN',
  stripe_token: 'STRIPE_TOKEN',
  paypal_token: 'PAYPAL_TOKEN',

  //production params
  itemsPerPage: 5,
  themeLogo: 'assets/images/icon/logo_temp.png',
  wazindoUrl: 'http://localhost:4200/',
  apiUrl: 'http://localhost:8000/api/v1/live/',
  STR_LIB_NOUVEAUTE: "Nouveautés",
  STR_LIB_AVENDRE: "A vendre",
  SAVE_PROJECT_INTERVAL: 300000
};

//ng build --aot --prod --build-optimizer --output-hashing all

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.