angular.module("petsIO").controller "MainCtrl", ($scope, Offers) ->
  $scope.headingTitle = "Top 12 Offers"
#  $scope.offers = Offers.query()
  $scope.offers = [];

  Offers.getAll().success (data) ->
    $scope.offers = data



