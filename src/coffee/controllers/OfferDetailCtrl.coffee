angular.module("petsIO").controller "OfferDetailCtrl", ($scope, $window, Offers, $routeParams) ->
  token = $window.localStorage.token

  Offers.getUserOffer($routeParams.id).success (data) ->
    $scope.userOffer = data

  $scope.editOffer = ->
    Offers.edit
      name: $scope.userOffer.offer.name
      id: $routeParams.id

  $scope.deleteOffer = ->
    deleteOffer = $window.confirm 'Are you absolutely sure you want to delete?'
    if deleteOffer
      Offers.delete
        id: $routeParams.id
