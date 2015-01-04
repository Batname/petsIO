angular.module("petsIO").controller "MainCtrl", ($scope, Offers) ->
  $scope.headingTitle = "Top 12 Offers"
  $scope.offers = Offers.query()
