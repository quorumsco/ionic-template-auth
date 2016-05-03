// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])
// bower install angular-mocks --save
// <script src="lib/angular-mocks/angular-mocks.js"></script>
// https://docs.angularjs.org/api/ngMockE2E
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })
  .state('main', {
    url: '/',
    abstract: true,
    templateUrl: 'templates/main.html'
  })
  .state('main.dash', {
    url: 'main/dash',
    views: {
        'dash-tab': {
          templateUrl: 'templates/dashboard.html',
          controller: 'DashCtrl'
        }
    }
  })
  .state('main.public', {
    url: 'main/public',
    views: {
        'public-tab': {
          templateUrl: 'templates/public.html',
          controller: 'publicCtrl'
        }
    }
  })
  .state('singleContact', {
    url: '/singleContact/:id',
    templateUrl: 'templates/singleContact.html',
    controller: 'singleContactCtrl'
  })
  .state('main.admin', {
    url: 'main/admin',
    views: {
        'admin-tab': {
          templateUrl: 'templates/admin.html'
        }
    }
  });

  $urlRouterProvider.otherwise(function ($injector, $location) {
    var $state = $injector.get("$state");
    $state.go("main.dash");
  });

})

//permet de gérer le fait qu'angular ne post que du JSON
.config(['$httpProvider', function ($httpProvider) {

  // ajout JBDA -
  $httpProvider.defaults.withCredentials = true;
  // Intercept POST requests, convert to standard form encoding
  $httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
  $httpProvider.defaults.transformRequest.unshift(function (data, headersGetter) {
    var key, result = [];

    if (typeof data === "string")
      return data;

    for (key in data) {
      if (data.hasOwnProperty(key))
        result.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
    }
    return result.join("&");
  });
}])


.run(function ($rootScope, $state, AuthService, AUTH_EVENTS,$timeout) {
  $rootScope.$on('$stateChangeStart', function (event,next, nextParams, fromState) {
  //console.debug("AuthService.authToken:"+AuthService.authToken);
  //AuthService.auth().then(function(val){AuthService.authToken});
  console.debug("STATE CHANGE / authToken : "+AuthService.authToken());

    if (AuthService.authToken()!="true") 
    {
      AuthService.auth();
      $timeout(function() 
      {
        //alert("dd");
      }, 1000)
      .then(function() {
        console.debug("DANS TIMEOUT/valeur de authToken:"+AuthService.authToken());
        if (AuthService.authToken()!="true") 
        {
              if (next.name !== 'login') {
                  event.preventDefault();
                  console.debug("route vers login");
                  $state.go('login');
              }
        }
      });
      
    }else 
        {
          console.debug("loguer!!!!");
          //$state.go('main/dash');
        }
  });
});
