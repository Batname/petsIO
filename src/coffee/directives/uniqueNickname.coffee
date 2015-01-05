angular.module("petsIO").directive "uniquenickname", ($http) ->
  restrict: "A"
  require: "ngModel"
  link: (scope, element, attrs, ngModel) ->
    element.bind "blur", ->
      if ngModel.$modelValue
        $http.get("/api/users",
          params:
            nickname: ngModel.$modelValue
        ).success (data) ->
          ngModel.$setValidity "uniquenickname", data.available

    element.bind "keyup", ->
      ngModel.$setValidity "uniquenickname", true
