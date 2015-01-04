angular.module("petsIO").factory "userInfofactory", ($resource) ->
  $resource "api/userInfo"