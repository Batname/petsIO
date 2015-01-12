angular.module('petsIO').factory('AllUsersFactory',[ 
	'$resource'
	'$http'
	($resource, $http) ->
		class AllUsersFactory
			constructor: (errorHandler) ->
				@users = $resource('/api/allusers',
					headers: {'Content-Type': 'application/x-www-form-urlencoded'})
				@errorHandler = errorHandler  


			all: ->
				@users.query((-> null), @errorHandler)	  
])
