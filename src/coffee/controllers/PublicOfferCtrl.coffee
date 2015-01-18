angular.module("petsIO").controller("PublicOfferCtrl",[
	"$scope"
	"PublicOffersFactory"
	"$window"
	"$routeParams"
	($scope, PublicOffersFactory, $window, $routeParams) ->
		$scope.singleOffer = PublicOffersFactory.get({ ID: $routeParams.id })
])