/**
* Municipalities controller
* @namespace glaubs.municipalities.controllers
*/
(function () {
  'use strict';

  angular
    .module('glaubs.municipalities.controllers')
    .controller('MunicipalitiesController', MunicipalitiesController);

  MunicipalitiesController.$inject = ['$location', '$scope', '$sce', 'Municipalities'];

  /**
  * @namespace MunicipalitiesController
  */
  function MunicipalitiesController($location, $scope, $sce, Municipalities) {
    var vm = this;

    $scope.query = '';
    $scope.municipality = null;
    $scope.selected = null;
    $scope.related = null;

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
        $scope.selected = $item;
        Municipalities.get_primary($item.id).success(function(municipality) {
            $scope.municipality = municipality;
        });
        Municipalities.related($item.id).success(function(related) {
            $scope.related = related;
            $scope.related_names = $sce.trustAsHtml(related.map(function (m) {
                var result = m.name + ' (' + m.zip_code + ')';
                if (m.primary) {
                    return '<b>' + result + '</b>';
                } else {
                    return result;
                }
            }).join(', '));
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
