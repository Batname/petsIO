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
    }).when("/offers/:id", {
      templateUrl: "views/offerdetails.html",
      controller: 'OfferDetailCtrl'
    }).when("/offerscreate", {
      templateUrl: "views/offercreate.html",
      controller: 'OfferCreateCtrl'
    }).when("/allusers", {
      templateUrl: "views/allusers.html",
      controller: "AllUsersCtrl"
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
  angular.module("petsIO").controller("AllUsersCtrl", [
    '$scope', 'AllUsersFactory', function($scope, AllUsersFactory) {
      var allUsers, serverErrorHandler;
      serverErrorHandler = function() {
        return alert("There was a server error, please reload the page and try again.");
      };
      allUsers = new AllUsersFactory(serverErrorHandler);
      return $scope.allusers = allUsers.all();
    }
  ]);

}).call(this);

(function() {
  angular.module("petsIO").controller("OfferCreateCtrl", function($scope, $window, Offers, $location) {
    var token;
    token = $window.localStorage.token;
    if (!token) {
      $location.path("/login");
    }
    return $scope.createOffer = function() {
      return Offers.create({
        name: $scope.userOffer.offer.name
      });
    };
  });

}).call(this);

(function() {
  angular.module("petsIO").controller("OfferDetailCtrl", function($scope, $window, Offers, $routeParams) {
    var token;
    token = $window.localStorage.token;
    Offers.getUserOffer($routeParams.id).success(function(data) {
      return $scope.userOffer = data;
    });
    $scope.editOffer = function() {
      return Offers.edit({
        name: $scope.userOffer.offer.name,
        id: $routeParams.id
      });
    };
    return $scope.deleteOffer = function() {
      var deleteOffer;
      deleteOffer = $window.confirm('Are you absolutely sure you want to delete?');
      if (deleteOffer) {
        return Offers["delete"]({
          id: $routeParams.id
        });
      }
    };
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
    var cats, dogs;
    dogs = ["Labrador Retriever", "German Shepherd Dog", "Beagle", "Golden Retriever", "Yorkshire Terrier", "Bulldog", "Boxer", "Poodle", "Dachshund", "Rottweiler", "Shih Tzu", "Miniature Schnauzer", "Doberman Pinscher", "Chihuahua", "German Shorthaired Pointer", "Siberian Husky", "Pomeranian", "French Bulldog", "Great Dane", "Shetland Sheepdog", "Cavalier King Charles Spaniel", "Boston Terrier", "Maltese Dog", "Australian Shepherd", "Pembroke Welsh Corgi", "Pug", "Cocker Spaniel", "English Mastiff", "English Springer Spaniel", "French Brittany"];
    cats = ["Abyssinian", "Aegean", "American Bobtail", "American Curl", "American Shorthair", "American Wirehair", "Arabian Mau", "Asian", "Asian Semi-longhair", "Australian Mist", "Balinese", "Bambino", "Bengal", "Birman", "Bombay", "Brazilian Shorthair", "British Longhair", "British Semi-longhair", "British Shorthair", "Burmese", "Burmilla", "California Spangled", "Chantilly-Tiffany", "Chartreux", "Chausie", "Cheetoh", "Colorpoint Shorthair", "Cornish Rex", "Cyprus", "Devon Rex", "Dragon Li", "Egyptian Mau", "European Shorthair", "Exotic ShortHair", "German Rex", "Havana Brown", "Highlander", "Japanese Bobtail", "Javanese", "Khao Manee", "Korat", "Korean Bobtail", "Korn Ja", "Kurilian Bobtail", "LaPerm", "Lykoi", "Maine Coon", "Manx", "Mekong Bobtail", "Minskin", "Munchkin", "Napoleon", "Nebelung", "Norwegian Forest Cat", "Ocicat", "Ojos Azules", "Oregon Rex", "Oriental Bicolor", "Oriental Longhair", "Oriental Shorthair", "Persian (Modern Persian Cat)", "Persian (Traditional Persian Cat)", "Peterbald", "Pixie-bob", "Raas", "Ragamuffin", "Ragdoll", "Russian Blue", "Russian White, Black and Tabby", "Sam Sawet", "Savannah", "Scottish Fold", "Selkirk Rex", "Serengeti", "Serrade petit", "Siamese", "Siberian", "Singapura", "Snowshoe", "Sokoke", "Somali", "Sphynx", "Thai", "Tonkinese", "Toyger", "Turkish Angora", "Turkish Van", "Ukrainian Levkoy", "York Chocolate"];
    $scope.alphabet = ['0-9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    $scope.offers = [];
    Offers.getAll().success(function(data) {
      return $scope.offers = data;
    });
    $scope.titles = [
      {
        name: "Pets for sale"
      }, {
        name: "Pets for sex"
      }
    ];
    $scope.myTitle = $scope.titles[0];
    return $scope.$watch("myTitle", function(val) {
      if (val.name === "Pets for sale") {
        $scope.genres = dogs;
      }
      if (val.name === "Pets for sex") {
        return $scope.genres = cats;
      }
    });
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
  angular.module("petsIO").controller("UserinfoCtrl", function($scope, $routeParams, userInfofactory, Offers, userFactory, $window, $location) {
    var token;
    token = $window.localStorage.token;
    if (!token) {
      $location.path("/login");
    }
    userInfofactory.get(function(info) {
      $scope.info = info;
      if ($window.localStorage.token) {
        return $scope.info.token = $window.localStorage.token;
      }
    });
    $scope.editUser = function() {
      return userFactory.edit({
        description: $scope.info.description,
        user_id: $scope.info.user_id
      });
    };
    $scope.deleteUser = function() {
      var deleteUser;
      deleteUser = $window.confirm('Are you absolutely sure you want to delete?');
      if (deleteUser) {
        return userFactory["delete"]({
          user_id: $scope.info.user_id
        });
      }
    };
    return Offers.getUser().success(function(data) {
      return $scope.userOffers = data;
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
  angular.module('petsIO').factory('AllUsersFactory', [
    '$resource', '$http', function($resource, $http) {
      var AllUsersFactory;
      return AllUsersFactory = (function() {
        function AllUsersFactory(errorHandler) {
          this.users = $resource('/api/allusers', {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          });
          this.errorHandler = errorHandler;
        }

        AllUsersFactory.prototype.all = function() {
          return this.users.query((function() {
            return null;
          }), this.errorHandler);
        };

        return AllUsersFactory;

      })();
    }
  ]);

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
        $location.path("/userinfo");
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
  angular.module("petsIO").factory("Offers", function($http, $alert, $location) {
    return {
      getAll: function() {
        return $http({
          url: "/api/offers",
          method: "GET"
        });
      },
      getUser: function() {
        return $http({
          url: "/api/user/offers",
          method: "GET",
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });
      },
      getUserOffer: function(id) {
        return $http({
          url: "/api/offers/" + id,
          method: "GET"
        });
      },
      edit: function(offer) {
        return $http({
          method: 'PUT',
          url: "/api/offers/" + offer.id,
          data: $.param(offer),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).success(function(data) {
          $location.path("/userinfo");
          return $alert({
            title: 'Edit!',
            content: 'Your offer has been edited.',
            animation: 'fadeZoomFadeDown',
            type: 'material',
            duration: 3
          });
        }).error(function() {
          return $alert({
            title: 'Error!',
            content: 'Something hepened.',
            animation: 'fadeZoomFadeDown',
            type: 'material',
            duration: 3
          });
        });
      },
      "delete": function(offer) {
        return $http({
          method: 'DELETE',
          url: "/api/offers/" + offer.id,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).success(function(data) {
          $location.path("/userinfo");
          return $alert({
            title: 'Goodbay!',
            content: 'Your offer has been deleted.',
            animation: 'fadeZoomFadeDown',
            type: 'material',
            duration: 3
          });
        }).error(function() {
          return $alert({
            title: 'Error!',
            content: 'Something hepened.',
            animation: 'fadeZoomFadeDown',
            type: 'material',
            duration: 3
          });
        });
      },
      create: function(offer) {
        return $http({
          method: 'POST',
          url: "/api/offers",
          data: $.param(offer),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).success(function(data) {
          $location.path("/userinfo");
          return $alert({
            title: 'Edit!',
            content: 'Your offer has been created.',
            animation: 'fadeZoomFadeDown',
            type: 'material',
            duration: 3
          });
        }).error(function() {
          return $alert({
            title: 'Error!',
            content: 'Something hepened.',
            animation: 'fadeZoomFadeDown',
            type: 'material',
            duration: 3
          });
        });
      }
    };
  });

}).call(this);

(function() {
  angular.module("petsIO").factory("userFactory", function($http, $location, $rootScope, $alert, $window) {
    return {
      edit: function(user) {
        return $http({
          method: 'PUT',
          url: "/api/userInfo/" + user.user_id,
          data: $.param(user),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).success(function(data) {
          return $alert({
            title: 'Edit!',
            content: 'Your account has been edited.',
            animation: 'fadeZoomFadeDown',
            type: 'material',
            duration: 3
          });
        }).error(function() {
          return $alert({
            title: 'Error!',
            content: 'Something hepened.',
            animation: 'fadeZoomFadeDown',
            type: 'material',
            duration: 3
          });
        });
      },
      "delete": function(user) {
        return $http({
          method: 'DELETE',
          url: "/api/userInfo/" + user.user_id,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).success(function(data) {
          delete $window.localStorage.token;
          $rootScope.currentUser = null;
          $location.path("/");
          return $alert({
            title: 'Goodbay!',
            content: 'Your account has been deleted.',
            animation: 'fadeZoomFadeDown',
            type: 'material',
            duration: 3
          });
        }).error(function() {
          return $alert({
            title: 'Error!',
            content: 'Something hepened.',
            animation: 'fadeZoomFadeDown',
            type: 'material',
            duration: 3
          });
        });
      }
    };
  });

}).call(this);

(function() {
  angular.module("petsIO").factory("userInfofactory", function($http, $location, $rootScope, $alert, $window, $resource) {
    return $resource("api/userInfo");
  });

}).call(this);
