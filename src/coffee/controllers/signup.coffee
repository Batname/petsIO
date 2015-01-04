angular.module("petsIO").controller "SignupCtrl", ($scope, Auth) ->
  $scope.signup = ->
    Auth.signup
      username: $scope.username
      nickname: $scope.nickname
      password: $scope.password
  $scope.pageClass = "fadeZoom"
