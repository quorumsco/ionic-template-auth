angular.module('starter')

.constant('AUTH_EVENTS', {
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized',
  notLogged: 'auth-not-logged',
  badRequest: 'auth-bad-request'
})

.constant('API_ENDPOINT', {
  url: 'http://localhost:8080'
  //  For production use: 
  //url: 'https://api.quorumapps.com'

});