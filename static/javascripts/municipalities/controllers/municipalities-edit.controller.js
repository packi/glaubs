/**
* Municipalities controller
* @namespace glaubs.municipalities.controllers
*/
(function () {
  'use strict';

  angular
    .module('glaubs.municipalities-edit.controllers')
    .controller('MunicipalitiesEditController', MunicipalitiesEditController);

  MunicipalitiesEditController.$inject = ['$scope', 'Municipalities', '$routeParams'];

  /**
  * @namespace MunicipalitiesEditController
  */
  function MunicipalitiesEditController($scope, Municipalities, $routeParams) {
    var vm = this;
    vm.id = $routeParams.id;
    $scope.municipality = {};
    $scope.saved = false;

    function refresh() { 
        Municipalities.load_one($routeParams.id, function(municipality) {
           $scope.municipality = municipality;
        });
    }

    refresh();

    vm.updateMunicipality = updateMunicipality;

    function updateMunicipality() {
        $scope.saved = false;
        Municipalities.update(
            vm.id,
            $scope.municipality
        ).success(function() {
            $scope.saved = true;
        });
    }

  }
})();
