angular.module("petsIO").factory "userFactory", ($http, $location, $rootScope, $alert, $window) ->
  edit: (user) ->
    $http({
      method: 'PUT',
      url: "/api/userInfo/"+user.user_id,
      data: $.param(user),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success((data) ->
      $alert
        title: 'Edit!',
        content: 'Your account has been edited.',
        animation: 'fadeZoomFadeDown',
        type: 'material',
        duration: 3
    ).error ->
      $alert
        title: 'Error!',
        content: 'Something hepened.',
        animation: 'fadeZoomFadeDown',
        type: 'material',
        duration: 3

  delete: (user) ->
    $http({
      method: 'DELETE',
      url: "/api/userInfo/"+user.user_id,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success((data) ->
      delete $window.localStorage.token
      $rootScope.currentUser = null
      $location.path "/"
      $alert
        title: 'Goodbay!',
        content: 'Your account has been deleted.',
        animation: 'fadeZoomFadeDown',
        type: 'material',
        duration: 3
    ).error ->
      $alert
        title: 'Error!',
        content: 'Something hepened.',
        animation: 'fadeZoomFadeDown',
        type: 'material',
        duration: 3