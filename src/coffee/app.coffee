angular.module("petsIO", [
  "ngResource"
  "ngMessages"
  "ngRoute"
  "ngAnimate"
  "mgcrea.ngStrap"
  "pasvaz.bindonce"
]).config(($routeProvider, $locationProvider) ->
  $locationProvider.html5Mode true
  $routeProvider
  .when("/",
    templateUrl: "views/home.html"
    controller: 'MainCtrl'
  ).when("/login",
    templateUrl: "views/login.html"
    controller: 'LoginCtrl'
  ).when("/signup",
    templateUrl: "views/signup.html"
    controller: 'SignupCtrl'
  ).when("/userinfo",
    templateUrl: "views/userinfo.html"
    controller: 'UserinfoCtrl'
  ).when("/offers/:id",
    templateUrl: "views/offerdetails.html"
    controller: 'OfferDetailCtrl'
  ).when("/offerscreate",
    templateUrl: "views/offercreate.html"
    controller: 'OfferCreateCtrl'
  ).when("/allusers",
    templateUrl:"views/allusers.html"
    controller: "AllUsersCtrl"
  ).when("/public/offer/:id",
    templateUrl:"views/public/offer.html",
    controller: "PublicOfferCtrl"  
  ).when("/public/user/:id",
    templateUrl: "views/public/user.html",
    controller: "PublicUserCtrl"
  ).otherwise redirectTo: "/"    
).config ($httpProvider) ->
  $httpProvider.interceptors.push ($rootScope, $q, $window, $location) ->
    request: (config) ->
      config.headers.Authorization = $window.localStorage.token  if $window.localStorage.token
      config

    responseError: (response) ->
      $location.path "/login"  if response.status is 401 or response.status is 403
      $q.reject response

