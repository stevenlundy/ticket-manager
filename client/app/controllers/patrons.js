var patrons = angular.module('patrons', ['patrons.services']);

patrons.controller('PatronListCtrl', ['$scope', 'Patrons',
  function ($scope, Patrons) {
    $scope.patrons = [];

    Patrons.getPatrons().then(function (patrons) {
      $scope.patrons = patrons;
    });
  }
]);

patrons.controller('PatronDetailCtrl', ['$scope', '$routeParams', 'Patrons',
  function ($scope, $routeParams, Patrons) {
    $scope.patron_number = $routeParams.patron_number;
    $scope.patronOrders = [];
    $scope.patronInfo = {};

    Patrons.getPatronOrders($scope.patron_number).then(function (orders) {
      $scope.patronOrders = orders;
    });
    Patrons.getPatronInfo($scope.patron_number).then(function (info) {
      $scope.patronInfo = info;
    });
  }
]);
