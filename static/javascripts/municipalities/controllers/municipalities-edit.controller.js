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

    function refresh() { 
        Municipalities.load_one($routeParams.id, function(municipality) {
           $scope.municipality = municipalitiy;
        });
    }

    refresh();

    vm.updateMunicipality = updateMunicipality;

    function updateMunicipality() {
        Municipalities.update(
            vm.id,
            $scope.municipality.name,
            $scope.municipality.zip_code,
            $scope.municipality.address,
            $scope.municipality.phone_number,
            $scope.municipality.comment).success(function() {
        });
    }

  }
})();
