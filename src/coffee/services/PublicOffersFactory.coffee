angular.module("petsIO").factory("PublicOffersFactory",[
	 '$resource'
	 ($resource) ->
		 	$resource '/api/offers/:ID',
		 		ID: '@id'
])	