angular.module("petsIO").controller("PublicUserCtrl", [
	"$scope"
	"$routeParams"
	"PublicUserFactory"
	($scope, $routeParams, PublicUserFactory) ->
	  PublicUserFactory.getUser($routeParams.id).success (data) ->
	    $scope.userData = data

	  PublicUserFactory.getUserOffers($routeParams.id).success (data) ->
	    $scope.userOffersData = data
])