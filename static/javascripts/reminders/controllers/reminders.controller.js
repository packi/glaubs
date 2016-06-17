/**
* Reminders controller
* @namespace glaubs.reminders.controllers
*/
(function () {
  'use strict';

  angular
    .module('glaubs.reminders.controllers')
    .controller('RemindersController', RemindersController);

  RemindersController.$inject = ['$location', '$scope', '$sce', 'Reminders', 'Mailings'];

  /**
  * @namespace RemindersController
  */
  function RemindersController($location, $scope, $sce, Reminders, Mailings) {
    var vm = this;

    $scope.sent_mailings = [];
    $scope.called_mailings = [];

    vm.searchMailing = searchMailing;

    vm.searchMailing();

    function searchMailing() {
        Reminders.search('sent')
            .success(function(mailings) {
                $scope.sent_mailings = mailings;
            });
        Reminders.search('called')
            .success(function(mailings) {
                $scope.called_mailings = mailings;
            });
    }

  }
})();
