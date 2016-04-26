angular.module('starter')

.constant('AUTH_EVENTS', {
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized',
  notLogged: 'auth-not-logged'
})

.constant('USER_ROLES', {
  admin: 'admin_role',
  public: 'public_role'
});
