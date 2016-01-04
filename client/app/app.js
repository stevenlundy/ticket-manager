var ticketManager = angular.module('ticketManager', [
  'ngRoute',
  'patrons'
]);
ticketManager.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/patrons', {
        templateUrl: 'app/views/patron-list.html',
        controller: 'PatronListCtrl'
      })
      .when('/patrons/:patron_number', {
        templateUrl: 'app/views/patron-detail.html',
        controller: 'PatronDetailCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
  }]
);
