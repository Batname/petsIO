angular.module("petsIO").controller "UserinfoCtrl", ($scope, $rootScope, $routeParams, userInfofactory, userFactory, $window) ->
  token = $window.localStorage.token

  userInfofactory.get (info) ->
    $scope.info = info
    $scope.info.token = $window.localStorage.token  if $window.localStorage.token

  $scope.editUser = ->
    userFactory.edit
      description: $scope.info.description
      user_id: $scope.info.user_id

  $scope.deleteUser = ->
    deleteUser = $window.confirm 'Are you absolutely sure you want to delete?'
    if deleteUser
      userFactory.delete
          user_id: $scope.info.user_id
