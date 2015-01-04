angular.module("petsIO").factory "Auth", ($http, $location, $rootScope, $alert, $window) ->
#  token = $window.localStorage.token
#  if token
#    payload = JSON.parse($window.atob(token.split(".")[1]))
#    $rootScope.currentUser = payload.user

  login: (user) ->
    $http({
      method: 'POST',
      url: "/api/login",
      data: $.param(user),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success((data) ->
      $window.localStorage.token = data.token_type + " " + data.access_token
      $location.path "/"
    ).error ->
      delete $window.localStorage.token
      console.log("403")
  signup: (user) ->
    $http.post("/api/signup", user).success((data) ->
      console.log (data)
      $location.path "/login"
    ).error (response) ->
      console.log (response.message)
  logout: ->
    delete $window.localStorage.token
    $rootScope.currentUser = null
    $location.path "/"

