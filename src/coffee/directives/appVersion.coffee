"use strict"

# Directives 
angular.module("petsIO")
.directive("appVersion", [ "version", (version) ->
  (scope, elm, attrs) ->
    elm.text version
 ])