/**
* Municipalities controller
* @namespace glaubs.municipalities.controllers
*/
(function () {
  'use strict';

  angular
    .module('glaubs.municipalities.controllers')
    .controller('MunicipalitiesController', MunicipalitiesController);

  MunicipalitiesController.$inject = ['$location', '$scope', 'Municipalities'];

  /**
  * @namespace MunicipalitiesController
  */
  function MunicipalitiesController($location, $scope, Municipalities) {
    var vm = this;

    function refresh() { 
        Municipalities.load(function(municipalities) {
           $scope.municipalities = municipalities;
           $scope.municipality = {};
        });
    }

    $scope.query = '';

    angular.element('#searchMunicipality__query').focus()
    refresh();

    vm.createMunicipality = createMunicipality;
    vm.deleteMunicipality = deleteMunicipality;
    vm.searchMunicipality = searchMunicipality;

    /**
    * @memberOf glaubs.municipalities.controllers.MunicipalitiesController
    */
    function createMunicipality() {
        Municipalities.create(
            $scope.municipality.name,
            $scope.municipality.zip_code,
            $scope.municipality.address,
            $scope.municipality.phone_number,
            $scope.municipality.comment
        ).success(function() {
            $scope.addVisible = false;
            refresh();
        });
    }

    function deleteMunicipality(id) {
        Municipalities.del(id)
          .success(function() {
              refresh();
          });
    }

    function searchMunicipality() {
        Municipalities.search($scope.query)
          .success(function(municipalities) {
              $scope.municipalities = municipalities;
          });
    }

  }
})();
