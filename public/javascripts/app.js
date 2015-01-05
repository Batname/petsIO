(function() {
  angular.module("petsIO", ["ngResource", "ngMessages", "ngRoute", "ngAnimate", "mgcrea.ngStrap"]).config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    return $routeProvider.when("/", {
      templateUrl: "views/home.html",
      controller: 'MainCtrl'
    }).when("/login", {
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
  angular.module("petsIO").controller("MainCtrl", function($scope, Offers) {
    $scope.headingTitle = "Top 12 Offers";
    return $scope.offers = Offers.query();
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
        new_user: true,
        grant_type: 'password',
        client_id: 'angular',
        client_secret: '21091091',
        username: $scope.username,
        nickname: $scope.nickname,
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
  angular.module("petsIO").directive("passwordStrength", function() {
    return {
      restrict: "A",
      require: "ngModel",
      link: function(scope, element, attrs, ngModel) {
        var dots, indicator, strong, strongest, weak, weakest;
        indicator = element.children();
        dots = Array.prototype.slice.call(indicator.children());
        weakest = dots.slice(-1)[0];
        weak = dots.slice(-2);
        strong = dots.slice(-3);
        strongest = dots.slice(-4);
        element.after(indicator);
        return element.bind("keyup", function() {
          angular.forEach(dots, function(el) {
            return el.style.backgroundColor = "#ebeef1";
          });
          if (ngModel.$modelValue) {
            if (ngModel.$modelValue.length > 8) {
              return angular.forEach(strongest, function(el) {
                return el.style.backgroundColor = "#008cdd";
              });
            } else if (ngModel.$modelValue.length > 5) {
              return angular.forEach(strong, function(el) {
                return el.style.backgroundColor = "#6ead09";
              });
            } else if (ngModel.$modelValue.length > 3) {
              return angular.forEach(weak, function(el) {
                return el.style.backgroundColor = "#e09115";
              });
            } else {
              return weakest.style.backgroundColor = "#e01414";
            }
          }
        });
      },
      template: "<span class=\"password-strength-indicator\"><span></span><span></span><span></span><span></span></span>"
    };
  });

}).call(this);

(function() {
  angular.module("petsIO").directive("uniqueEmail", function($http) {
    return {
      restrict: "A",
      require: "ngModel",
      link: function(scope, element, attrs, ngModel) {
        element.bind("blur", function() {
          if (ngModel.$modelValue) {
            return $http.get("/api/users", {
              params: {
                username: ngModel.$modelValue
              }
            }).success(function(data) {
              return ngModel.$setValidity("unique", data.available);
            });
          }
        });
        return element.bind("keyup", function() {
          return ngModel.$setValidity("unique", true);
        });
      }
    };
  });

}).call(this);

(function() {
  angular.module("petsIO").directive("uniquenickname", function($http) {
    return {
      restrict: "A",
      require: "ngModel",
      link: function(scope, element, attrs, ngModel) {
        element.bind("blur", function() {
          if (ngModel.$modelValue) {
            return $http.get("/api/users", {
              params: {
                nickname: ngModel.$modelValue
              }
            }).success(function(data) {
              return ngModel.$setValidity("uniquenickname", data.available);
            });
          }
        });
        return element.bind("keyup", function() {
          return ngModel.$setValidity("uniquenickname", true);
        });
      }
    };
  });

}).call(this);

(function() {
  angular.module("petsIO").factory("Auth", function($http, $location, $rootScope, $alert, $window, userInfofactory) {
    var getCurrentUserInfo, loginMethod, signupMethod, token;
    token = $window.localStorage.token;
    getCurrentUserInfo = function() {
      return userInfofactory.get(function(info) {
        return $rootScope.currentUser = info;
      });
    };
    if (token) {
      getCurrentUserInfo();
    }
    loginMethod = function(user) {
      return $http({
        method: 'POST',
        url: "/api/login",
        data: $.param(user),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).success(function(data) {
        $window.localStorage.token = data.token_type + " " + data.access_token;
        getCurrentUserInfo();
        $location.path("/");
        if (user.new_user) {
          return $alert({
            title: 'Congratulations!',
            content: 'Your account has been created.',
            animation: 'fadeZoomFadeDown',
            type: 'material',
            duration: 3
          });
        } else {
          return $alert({
            title: "Cheers!",
            content: "You have successfully logged in.",
            animation: "fadeZoomFadeDown",
            type: "material",
            duration: 3
          });
        }
      }).error(function() {
        delete $window.localStorage.token;
        return $alert({
          title: 'Error!',
          content: 'Invalid username or password.',
          animation: 'fadeZoomFadeDown',
          type: 'material',
          duration: 3
        });
      });
    };
    signupMethod = function(user) {
      return $http.post("/api/signup", user).success(function(data) {
        if (user.new_user) {
          return loginMethod(user);
        }
      }).error(function(response) {
        return $alert({
          title: 'Error!',
          content: response.data,
          animation: 'fadeZoomFadeDown',
          type: 'material',
          duration: 3
        });
      });
    };
    return {
      login: function(user) {
        return loginMethod(user);
      },
      signup: function(user) {
        return signupMethod(user);
      },
      logout: function() {
        delete $window.localStorage.token;
        $rootScope.currentUser = null;
        $location.path("/");
        return $alert({
          content: 'You have been logged out.',
          animation: 'fadeZoomFadeDown',
          type: 'material',
          duration: 3
        });
      }
    };
  });

}).call(this);

(function() {
  angular.module("petsIO").factory("Offers", function($resource) {
    return $resource("/api/offers");
  });

}).call(this);

(function() {
  angular.module("petsIO").factory("userInfofactory", function($resource) {
    return $resource("api/userInfo");
  });

}).call(this);
