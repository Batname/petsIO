angular.module("petsIO").directive "uniqueEmail", ($http) ->
  restrict: "A"
  require: "ngModel"
  link: (scope, element, attrs, ngModel) ->
    element.bind "blur", ->
      if ngModel.$modelValue
        $http.get("/api/users",
          params:
            username: ngModel.$modelValue
        ).success (data) ->
          ngModel.$setValidity "unique", data.available

    element.bind "keyup", ->
      ngModel.$setValidity "unique", true
