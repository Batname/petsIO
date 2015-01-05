angular.module("petsIO").controller "SignupCtrl", ($scope, Auth) ->
  $scope.signup = ->
    Auth.signup
      new_user: true
      grant_type: 'password'
      client_id: 'angular'
      client_secret: '21091091'
      username: $scope.username
      nickname: $scope.nickname
      password: $scope.password
  $scope.pageClass = "fadeZoom"
