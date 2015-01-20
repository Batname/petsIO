angular.module("petsIO").factory("WebSocketFactory", [
	"$rootScope"
	($rootScope) ->
		socket = io.connect()
		on: (eventName, callback) ->
		    socket.on eventName, ->
		      args = arguments
		      $rootScope.$apply ->
		        callback.apply socket, args
	  emit: (eventName, data, callback) ->
	    socket.emit eventName, data, ->
	      args = arguments
	      $rootScope.$apply ->
	        callback.apply socket, args  if callback   	
])		
