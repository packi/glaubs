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

    $scope.query = '';
    $scope.municipality = null;

    angular.element('#searchMunicipality__query').focus()

    vm.createMunicipality = createMunicipality;
    vm.deleteMunicipality = deleteMunicipality;
    vm.searchMunicipality = searchMunicipality;
    vm.lookupMunicipality = lookupMunicipality;
    vm.selected = selected;

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

    function lookupMunicipality(q) {
        return Municipalities.search(q).then(function(response) {
            return response.data;
        });
    }

    function selected($item) {
        console.log($item);
        Municipalities.get_primary($item.id).success(function(municipality) {
            $scope.municipality = municipality;
        });
    }

    function searchMunicipality() {
        if ($scope.query !== '') {
            Municipalities.search($scope.query)
              .success(function(municipalities) {
                  $scope.municipalities = municipalities;
              });
        } else {
            $scope.municipalities = [];
        }
    }

  }
})();
