angular.module("petsIO").controller "NavbarCtrl", ($scope, Auth) ->
  $scope.logout = ->
    Auth.logout()
