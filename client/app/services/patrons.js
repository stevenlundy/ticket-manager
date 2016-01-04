angular.module('patrons.services', [])
.factory('Patrons', function ($http) {
  var getPatrons = function () {
    return $http({
      method: 'GET',
      url: '/api/patrons'
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  var getPatronOrders = function (patron_number) {
    return $http({
      method: 'GET',
      url: '/api/patrons/' + patron_number + '/orders',
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  var getPatronInfo = function (patron_number) {
    return $http({
      method: 'GET',
      url: '/api/patrons/' + patron_number,
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  return {
    getPatrons: getPatrons,
    getPatronOrders: getPatronOrders,
    getPatronInfo: getPatronInfo
  };
});
