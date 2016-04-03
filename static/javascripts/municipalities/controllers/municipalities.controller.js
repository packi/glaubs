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
        });
    }

    refresh();

    vm.createMunicipality = createMunicipality;
    vm.deleteMunicipality = deleteMunicipality;


    /**
    * @memberOf glaubs.municipalities.controllers.MunicipalitiesController
    */
    function createMunicipality() {
        Municipalities.create(vm.name, vm.zip_code, vm.address, vm.phone_number, vm.comment)
          .success(function() {
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

  }
})();
