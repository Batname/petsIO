angular.module("petsIO").factory "userInfofactory", ($http, $location, $rootScope, $alert, $window, $resource) ->
  $resource "api/userInfo"