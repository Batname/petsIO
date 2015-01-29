"use strict"

# Filters 
angular.module("petsIO")
.filter("interpolate", [ "version", (version) ->
  (text) ->
    String(text).replace /\%VERSION\%/g, version
])