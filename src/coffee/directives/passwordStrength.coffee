angular.module("petsIO").directive "passwordStrength", ->
  restrict: "A"
  require: "ngModel"
  link: (scope, element, attrs, ngModel) ->
    indicator = element.children()
    dots = Array::slice.call(indicator.children())
    weakest = dots.slice(-1)[0]
    weak = dots.slice(-2)
    strong = dots.slice(-3)
    strongest = dots.slice(-4)
    element.after indicator
    element.bind "keyup", ->
      angular.forEach dots, (el) ->
        el.style.backgroundColor = "#ebeef1"

      if ngModel.$modelValue
        if ngModel.$modelValue.length > 8
          angular.forEach strongest, (el) ->
            el.style.backgroundColor = "#008cdd"

        else if ngModel.$modelValue.length > 5
          angular.forEach strong, (el) ->
            el.style.backgroundColor = "#6ead09"

        else if ngModel.$modelValue.length > 3
          angular.forEach weak, (el) ->
            el.style.backgroundColor = "#e09115"
        else
          weakest.style.backgroundColor = "#e01414"
  template: "<span class=\"password-strength-indicator\"><span></span><span></span><span></span><span></span></span>"
