angular.module("petsIO").factory "Offers", ($resource) ->
  $resource "/api/offers"