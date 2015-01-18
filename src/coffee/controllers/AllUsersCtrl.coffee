angular.module("petsIO").controller( "AllUsersCtrl", [
	'$scope'
	'AllUsersFactory'
	($scope, AllUsersFactory) ->

		serverErrorHandler = ->
		    alert("There was a server error, please reload the page and try again.")		

	    allUsers = new AllUsersFactory(serverErrorHandler)
	    $scope.allusers = allUsers.all()

])
