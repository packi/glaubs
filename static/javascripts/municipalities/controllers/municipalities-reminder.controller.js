/**
* Municipalities controller
* @namespace glaubs.municipalities.controllers
*/
(function () {
  'use strict';

  angular
    .module('glaubs.municipalities-reminder.controllers')
    .controller('MunicipalitiesReminderController', MunicipalitiesReminderController);

  MunicipalitiesReminderController.$inject = ['$scope', 'Municipalities', 'Mailings', '$routeParams'];

  /**
  * @namespace MunicipalitiesReminderController
  */
  function MunicipalitiesReminderController($scope, Municipalities, Mailings, $routeParams) {
    var vm = this;
    vm.id = $routeParams.id;
    $scope.municipality = {};
    $scope.saved = false;

    function refresh() { 
        Municipalities.load_one($routeParams.id, function(municipality) {
           $scope.municipality = municipality;
        });
        Mailings.load(vm.id, function(mailings) {
            mailings.forEach(function(mailing) {
                if (mailing.sent_on !== null) {
                    mailing.sent_on = Date.parse(mailing.sent_on);
                }
                if (mailing.received_on !== null) {
                    mailing.received_on = Date.parse(mailing.received_on);
                }
                if (mailing.called_on !== null) {
                    mailing.called_on = Date.parse(mailing.called_on);
                }
            });
            $scope.mailings = mailings;
        });
    }

    refresh();

    vm.markAsCalled = markAsCalled;

    function markAsCalled() {
        Municipalities.update(vm.id, $scope.municipality).then(function () {
            Mailings.mark(vm.id, 'called', 'sent').then(function () {
                refresh();
            });
        });
    }

  }
})();
