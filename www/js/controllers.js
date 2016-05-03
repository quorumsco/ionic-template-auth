angular.module('starter')


.controller('AppCtrl', function($scope, $state, $ionicPopup, AuthService, AUTH_EVENTS) {

  console.debug('AppCtrl');

  $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
    AuthService.logout();
    $state.go('login');
    var alertPopup = $ionicPopup.alert({
      title: 'Session Lost!',
      template: 'Sorry, You have to login again.'
    });
  });
})

.controller('LoginCtrl', function($scope, $state, $ionicPopup, AuthService) {
  $scope.data = {};

  $scope.login = function(data) {
    AuthService.login(data.username, data.password).then(function() {
      console.debug("ok controller login");
      $state.go('main.dash', {}, {reload: true});
    }, function(err) {
      var alertPopup = $ionicPopup.alert({
        title: 'Login failed!',
        template: 'Please check your credentials!'
      });
    });
  };
})

.controller('DashCtrl', function($scope, $state, $http, $ionicPopup, AuthService) {
  $scope.logout = function() {
    AuthService.logout();
    $state.go('login');
  };
})

.controller('singleContactCtrl', function($scope,$stateParams,ContactService) {
  $scope.contact = {};
    ContactService.getContact($stateParams.id).then(function(res) {
        $scope.contact = res;  
    });

})

.controller('publicCtrl', function($scope,ContactService,$ionicLoading) {
  $scope.show = function() {
    $ionicLoading.show({
      template: '<p>Loading...</p><ion-spinner></ion-spinner>'
    });
  };

  $scope.hide = function(){
        $ionicLoading.hide();
  };

  $scope.show($ionicLoading);
  $scope.contacts = [];
  ContactService.getContacts().then(function(res)
  {
    console.debug(res);
    $scope.contacts =res;
    $scope.hide($ionicLoading);
  });
})
