angular.module("petsIO").controller("WebSocketCtrl", [
	"$scope"
	"WebSocketFactory"
	($scope, WebSocketFactory) ->
	  # Socket listeners
	  # ================
	  WebSocketFactory.on "init", (data) ->
	    $scope.name = data.name
	    $scope.users = data.users

	  WebSocketFactory.on "send:message", (message) ->
	    $scope.messages.push message

	  WebSocketFactory.on "change:name", (data) ->
	    changeName data.oldName, data.newName

	  WebSocketFactory.on "user:join", (data) ->
	    $scope.messages.push
	      user: "chatroom"
	      text: "User " + data.name + " has joined."

	    $scope.users.push data.name

	  
	  # add a message to the conversation when a user disconnects or leaves the room
	  WebSocketFactory.on "user:left", (data) ->
	    $scope.messages.push
	      user: "chatroom"
	      text: "User " + data.name + " has left."

	    i = undefined
	    user = undefined
	    i = 0
	    while i < $scope.users.length
	      user = $scope.users[i]
	      if user is data.name
	        $scope.users.splice i, 1
	        break
	      i++

	  
	  # Private helpers
	  # ===============
	  changeName = (oldName, newName) ->
	    
	    # rename user in list of users
	    i = undefined
	    i = 0
	    while i < $scope.users.length
	      $scope.users[i] = newName  if $scope.users[i] is oldName
	      i++
	    $scope.messages.push
	      user: "chatroom"
	      text: "User " + oldName + " is now known as " + newName + "."


	  
	  # Methods published to the scope
	  # ==============================
	  $scope.changeName = ->
	    WebSocketFactory.emit "change:name",
	      name: $scope.newName
	    , (result) ->
	      unless result
	        alert "There was an error changing your name"
	      else
	        changeName $scope.name, $scope.newName
	        $scope.name = $scope.newName
	        $scope.newName = ""


	  $scope.messages = []
	  $scope.sendMessage = ->
	    WebSocketFactory.emit "send:message",
	      message: $scope.message

	    
	    # add the message to our model locally
	    $scope.messages.push
	      user: $scope.name
	      text: $scope.message

	    
	    # clear message box
	    $scope.message = ""
])
