angular.module("petsIO").factory "Auth", ($http, $location, $rootScope, $alert, $window) ->
  token = $window.localStorage.token
  $rootScope.currentUser = token
#  if token
#     $rootScope.currentUser = token


  login: (user) ->
    $http({
      method: 'POST',
      url: "/api/login",
      data: $.param(user),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success((data) ->
      $window.localStorage.token = data.token_type + " " + data.access_token
      $rootScope.currentUser = token
      $location.path "/"
      $alert
        title: "Cheers!"
        content: "You have successfully logged in."
        animation: "fadeZoomFadeDown"
        type: "material"
        duration: 3
    ).error ->
      delete $window.localStorage.token
      $alert
        title: 'Error!',
        content: 'Invalid username or password.',
        animation: 'fadeZoomFadeDown',
        type: 'material',
        duration: 3
  signup: (user) ->
    $http.post("/api/signup", user).success((data) ->
      $location.path "/login"
      $alert
        title: 'Congratulations!',
        content: 'Your account has been created.',
        animation: 'fadeZoomFadeDown',
        type: 'material',
        duration: 3
    ).error (response) ->
      $alert
        title: 'Error!',
        content: response.data,
        animation: 'fadeZoomFadeDown',
        type: 'material',
        duration: 3
      console.log (response.message)
  logout: ->
    delete $window.localStorage.token
    $rootScope.currentUser = null
    $location.path "/"
    $alert
      content: 'You have been logged out.',
      animation: 'fadeZoomFadeDown',
      type: 'material',
      duration: 3

