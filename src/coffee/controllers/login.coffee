angular.module("petsIO").controller "LoginCtrl", ($scope, Auth) ->
  $scope.login = ->
    Auth.login
      grant_type: 'password'
      client_id: 'angular'
      client_secret: '21091091'
      username: $scope.username
      password: $scope.password
  $scope.pageClass = "fadeZoom"

