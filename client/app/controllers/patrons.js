var patrons = angular.module('patrons', []);

patrons.controller('PatronListCtrl', ['$scope',
  function ($scope) {

  }
]);

patrons.controller('PatronDetailCtrl', ['$scope', '$routeParams',
  function ($scope, $routeParams) {
    $scope.patron_number = $routeParams.patron_number;
  }
]);
