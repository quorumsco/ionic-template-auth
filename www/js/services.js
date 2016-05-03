angular.module('starter')

.service('AuthService', function($q, $http, API_ENDPOINT,$timeout) {


  var authToken='';

// ------------- verification de l'authentification ---------------------------------------------

  function controlUserCredentials() {
    console.debug("controlUserCredentials");
    //console.debug("valeur de isAuthenticatedB:"+isAuthenticatedA());
    auth();
    console.debug("valeur de authToken:"+authToken);
    $timeout(function() 
      {
        //alert("dd");
      }, 3000)
    .then(function() {
      // You know the timeout is done here
    console.debug("valeur de authToken:"+authToken);
        
      });
  }

// ------------- verification de l'authentification ---------------------------------------------

  var auth = function () {
    console.debug("enter var auth");

      var req = {
        async: true,
        crossDomain: true,
        method: 'GET',
        url: API_ENDPOINT.url + '/me',
        headers: {
          'accept': 'application/json',
          'cache-control': 'no-cache'
         }
      }

      $http(req)
      .success(function(result) {
        console.debug("resultat /me: "+result.status);
        authToken="true";
      })
      .error(function(result)
      {
        console.debug("resultat /me: ECHEC");
        authToken="false";
      })
      .finally(function(){
      console.debug("authToken renvoyé de auth():"+authToken);
      //return authToken;
    });
  }



// ------------- gestion du login ---------------------------------------------
 
  var login = function(name, pw) {
    console.debug("enter var login");
    return $q(function(resolve, reject) {
      var req = {
        async: false,
        crossDomain: true,
        method: 'POST',
        //url: 'https://api.quorumapps.com/session',
        url: API_ENDPOINT.url + '/session',
        headers: {
          'accept': 'application/json',
          'cache-control': 'no-cache',
          'Content-Type': 'application/x-www-form-urlencoded'
         },
         data: { 
          username: name,
          password: pw
        }
      }
      $http(req).then(function(result) {
        console.debug("ok login");
        authToken="true";
        resolve(result.data);
      }, function errorCallback(result)
      {
        console.debug("ko login");
        console.debug(result.data);
        reject(result.data);
      });
    });
  };
// ------------- gestion du logout ---------------------------------------------
  var logout = function() {
    return $q(function(resolve, reject) {
      var req = {
        async: false,
        crossDomain: true,
        method: 'DELETE',
        //url: 'https://api.quorumapps.com/session',
        url: API_ENDPOINT.url + '/session',
        headers: {
          'accept': 'application/json',
          'cache-control': 'no-cache',
         }
      }
      $http(req).then(function(result) {
        console.debug("ok logout");
        authToken="false";
        resolve();
      }, function errorCallback(result)
      {
        console.debug("ko logout");
        authToken="false";
        reject();
      });
    });
  };



// ----------- appel automatique à chaque page ----------------------------
  //controlUserCredentials();

// ---------------------------------------------

  return {
    login: login,
    logout: logout,
    auth: auth,
    authToken: function() {return authToken;}
  };
})

// --------- interceptor -----------------------------------------------------

.factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
  return {
    responseError: function (response) {
      $rootScope.$broadcast({
        401: AUTH_EVENTS.notAuthenticated,
        403: AUTH_EVENTS.notAuthorized
      }[response.status], response);
      return $q.reject(response);
    }
  };
})

.config(function ($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
})

// --------- getcontact-----------------------------------------------------

.factory('ContactService', ['$http','$q',function($http,$q){

    return {
        getContacts:function() 
        {
            var deferred = $q.defer();
            $http({
                //url: API_ENDPOINT.url + '/contacts',
                url: 'http://localhost:8080/contacts',
                dataType: 'json',
                method: 'GET',
                data: '',
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            }).success(function(res)
            {
                deferred.resolve(res.data.contacts);
            }).error(function(error){
            });
          return deferred.promise;
        },
        getContact:function(id) {
            var deferred = $q.defer();
            //temp
            var contact = {
                id:id,
                surname:"Contact "+id,
                prenom:"le prénom pour"+id,
            };
            deferred.resolve(contact);
            return deferred.promise;
        }   
    };

}]);
