(function() {
  angular.module("petsIO", ["ngResource", "ngMessages", "ngRoute", "ngAnimate", "mgcrea.ngStrap"]).config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    return $routeProvider.when("/login", {
      templateUrl: "views/login.html",
      controller: 'LoginCtrl'
    }).when("/signup", {
      templateUrl: "views/signup.html",
      controller: 'SignupCtrl'
    }).when("/userinfo", {
      templateUrl: "views/userinfo.html",
      controller: 'UserinfoCtrl'
    }).otherwise({
      redirectTo: "/"
    });
  }).config(function($httpProvider) {
    return $httpProvider.interceptors.push(function($rootScope, $q, $window, $location) {
      return {
        request: function(config) {
          if ($window.localStorage.token) {
            config.headers.Authorization = $window.localStorage.token;
          }
          return config;
        },
        responseError: function(response) {
          if (response.status === 401 || response.status === 403) {
            $location.path("/login");
          }
          return $q.reject(response);
        }
      };
    });
  });

}).call(this);

(function() {
  angular.module("petsIO").controller("LoginCtrl", function($scope, Auth) {
    $scope.login = function() {
      return Auth.login({
        grant_type: 'password',
        client_id: 'angular',
        client_secret: '21091091',
        username: $scope.username,
        password: $scope.password
      });
    };
    return $scope.pageClass = "fadeZoom";
  });

}).call(this);

(function() {
  angular.module("petsIO").controller("NavbarCtrl", function($scope, Auth) {
    return $scope.logout = function() {
      return Auth.logout();
    };
  });

}).call(this);

(function() {
  angular.module("petsIO").controller("SignupCtrl", function($scope, Auth) {
    $scope.signup = function() {
      return Auth.signup({
        username: $scope.username,
        password: $scope.password
      });
    };
    return $scope.pageClass = "fadeZoom";
  });

}).call(this);

(function() {
  angular.module("petsIO").controller("UserinfoCtrl", function($scope, $rootScope, $routeParams, userInfofactory, $window) {
    return userInfofactory.get(function(info) {
      $scope.info = info;
      if ($window.localStorage.token) {
        return $scope.info.token = $window.localStorage.token;
      }
    });
  });

}).call(this);

(function() {
  angular.module("petsIO").factory("Auth", function($http, $location, $rootScope, $alert, $window) {
    return {
      login: function(user) {
        return $http({
          method: 'POST',
          url: "/api/login",
          data: $.param(user),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).success(function(data) {
          $window.localStorage.token = data.token_type + " " + data.access_token;
          return $location.path("/");
        }).error(function() {
          delete $window.localStorage.token;
          return console.log("403");
        });
      },
      signup: function(user) {
        return $http.post("/api/signup", user).success(function(data) {
          console.log(data);
          return $location.path("/login");
        }).error(function(response) {
          return console.log(response.message);
        });
      },
      logout: function() {
        delete $window.localStorage.token;
        $rootScope.currentUser = null;
        return $location.path("/");
      }
    };
  });

}).call(this);

(function() {
  angular.module("petsIO").factory("userInfofactory", function($resource) {
    return $resource("api/userInfo");
  });

}).call(this);
