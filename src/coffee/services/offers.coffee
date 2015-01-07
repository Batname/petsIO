angular.module("petsIO").factory "Offers", ($http, $alert, $location) ->

  getAll: ->
    $http
      url: "/api/offers"
      method: "GET"

  getUser: ->
    $http
      url: "/api/user/offers"
      method: "GET"
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}

  getUserOffer: (id)->
    $http
      url: "/api/offers/" + id
      method: "GET"

  edit: (offer) ->
    $http({
      method: 'PUT',
      url: "/api/offers/" + offer.id
      data: $.param(offer),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success((data) ->
      $location.path "/userinfo"
      $alert
        title: 'Edit!',
        content: 'Your offer has been edited.',
        animation: 'fadeZoomFadeDown',
        type: 'material',
        duration: 3
    ).error ->
      $alert
        title: 'Error!',
        content: 'Something hepened.',
        animation: 'fadeZoomFadeDown',
        type: 'material',
        duration: 3

  delete: (offer) ->
    $http({
      method: 'DELETE',
      url: "/api/offers/" + offer.id,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success((data) ->
      $location.path "/userinfo"
      $alert
        title: 'Goodbay!',
        content: 'Your offer has been deleted.',
        animation: 'fadeZoomFadeDown',
        type: 'material',
        duration: 3
    ).error ->
      $alert
        title: 'Error!',
        content: 'Something hepened.',
        animation: 'fadeZoomFadeDown',
        type: 'material',
        duration: 3

  create: (offer) ->
    $http({
      method: 'POST',
      url: "/api/offers"
      data: $.param(offer),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success((data) ->
      $location.path "/userinfo"
      $alert
        title: 'Edit!',
        content: 'Your offer has been created.',
        animation: 'fadeZoomFadeDown',
        type: 'material',
        duration: 3
    ).error ->
      $alert
        title: 'Error!',
        content: 'Something hepened.',
        animation: 'fadeZoomFadeDown',
        type: 'material',
        duration: 3
