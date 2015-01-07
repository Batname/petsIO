angular.module("petsIO").controller "OfferCreateCtrl", ($scope, $window, Offers, $location) ->

  token = $window.localStorage.token
  if !token
    $location.path "/login"

  $scope.createOffer = ->
    Offers.create
      name: $scope.userOffer.offer.name
