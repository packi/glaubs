(function () {
  'use strict';

  angular
    .module('glaubs.routes')
    .config(config);

  config.$inject = ['$routeProvider'];

  /**
  * @name config
  * @desc Define valid application routes
  */
  function config($routeProvider) {
    $routeProvider.when('/municipalities', {
      controller: 'MunicipalitiesController', 
      controllerAs: 'vm',
      templateUrl: '/static/templates/municipalities/municipalities.html'
    }).otherwise('/');
  }
})();
