angular.module("petsIO").controller "UserinfoCtrl", ($scope, $rootScope, $routeParams, userInfofactory, $window) ->
  userInfofactory.get (info) ->
    $scope.info = info
    $scope.info.token = $window.localStorage.token  if $window.localStorage.token

