/**
* Reminders controller
* @namespace glaubs.reminders.controllers
*/
(function () {
  'use strict';

  angular
    .module('glaubs.reminders_by_municipality.controllers')
    .controller('RemindersByMunicipalityController', RemindersByMunicipalityController);

  RemindersByMunicipalityController.$inject = ['$location', '$scope', '$sce', 'Reminders', 'Mailings'];

  /**
  * @namespace RemindersByMunicipalityController
  */
  function RemindersByMunicipalityController($location, $scope, $sce, Reminders, Mailings) {
    var vm = this;

    $scope.sent_mailings = [];
    $scope.called_mailings = [];

    vm.searchMailing = searchMailing;

    vm.searchMailing();

    function searchMailing() {
        Reminders.by_municipality('sent')
            .success(function(mailings) {
                $scope.sent_mailings = mailings;
            });
        Reminders.by_municipality('called')
            .success(function(mailings) {
                $scope.called_mailings = mailings;
            });
    }

  }
})();
