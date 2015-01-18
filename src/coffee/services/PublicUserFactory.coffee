angular.module("petsIO").factory("PublicUserFactory", [
	"$http"
	($http) ->
	  getUser: (id)->
	    $http
	      url: "/api/public/user/" + id
	      method: "GET"

	  getUserOffers: (id)->
	    $http
	      url: "/api/public/user/offers/" + id
	      method: "GET"      

])