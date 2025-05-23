// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  bungie_client_id: 46920,
  bungie_redirect_uri: "https://localhost:4200/auth/callback",
  bungie_token_url: "https://www.bungie.net/Platform/App/OAuth/Token/",
  bungie_authorize_url: "https://www.bungie.net/pt-br/OAuth/Authorize",
  bungie_api_key: "fbe3e87095ec4deaaa3893fdb89ed0c3",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
