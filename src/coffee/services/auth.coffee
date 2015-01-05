angular.module("petsIO").factory "Auth", ($http, $location, $rootScope, $alert, $window, userInfofactory) ->
  token = $window.localStorage.token
  getCurrentUserInfo = () ->
    userInfofactory.get (info) ->
      $rootScope.currentUser = info
  if token
    getCurrentUserInfo()

  loginMethod = (user) ->
    $http({
      method: 'POST',
      url: "/api/login",
      data: $.param(user),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success((data) ->
      $window.localStorage.token = data.token_type + " " + data.access_token
      getCurrentUserInfo()
      $location.path "/userinfo"
      if user.new_user
        $alert
          title: 'Congratulations!',
          content: 'Your account has been created.',
          animation: 'fadeZoomFadeDown',
          type: 'material',
          duration: 3
      else
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

  signupMethod = (user) ->
    $http.post("/api/signup", user).success((data) ->
      if user.new_user
        #$location.path "/login"
        loginMethod(user)
    ).error (response) ->
      $alert
        title: 'Error!',
        content: response.data,
        animation: 'fadeZoomFadeDown',
        type: 'material',
        duration: 3

  login: (user) ->
    loginMethod(user)

  signup: (user) ->
    signupMethod(user)

  logout: ->
    delete $window.localStorage.token
    $rootScope.currentUser = null
    $location.path "/"
    $alert
      content: 'You have been logged out.',
      animation: 'fadeZoomFadeDown',
      type: 'material',
      duration: 3

