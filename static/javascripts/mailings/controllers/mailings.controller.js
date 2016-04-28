/**
* Municipalities controller
* @namespace glaubs.municipalities.controllers
*/
(function () {
  'use strict';

  angular
    .module('glaubs.mailings.controllers')
    .controller('MailingsController', MailingsController);

  MailingsController.$inject = ['$location', '$scope', '$routeParams', 'Mailings', 'Municipalities'];

  /**
  * @namespace MailingsController
  */
  function MailingsController($location, $scope, $routeParams, Mailings, Municipalities) {
    var vm = this;
    vm.municipality_id = $routeParams.municipality_id;
    vm.mailing_id = $routeParams.mailing_id;
    vm.is_new_mailing = vm.mailing_id == 'new';

    function refresh() {
        $scope.mailing = {};
        $scope.mailings = {};

        Municipalities.load_one(vm.municipality_id, function(municipality) {
            $scope.municipality = municipality;
        });
        if(vm.is_new_mailing) {
            Mailings.get_max_number().success(function(resp) {
                $scope.mailing.from_number = resp['max_number'] + 1;
                angular.element('#createMailing__to_number').focus();
            });
            Mailings.load(vm.municipality_id, function(mailings) {
                $scope.mailings = mailings;
            });
        } else {
            Mailings.load_one(vm.municipality_id, vm.mailing_id).success(function(mailing) {
                $scope.mailing = mailing;
            });
        }
    }

    refresh();

    vm.createMailing = createMailing;
    vm.deleteMailing = deleteMailing;

    /**
    * @memberOf glaubs.mailings.controllers.MailingsController
    */
    function createMailing() {
        Mailings.create(vm.municipality_id, {
            from_number: $scope.mailing.from_number,
            to_number: $scope.mailing.to_number,
            number_of_signatures: $scope.mailing.number_of_signatures,
        }).success(function() {
            refresh();
        });
    }

    function deleteMailing(id) {
        Mailings.del(id)
          .success(function() {
              refresh();
          });
    }

  }
})();
