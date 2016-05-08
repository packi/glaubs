/**
* Municipalities controller
* @namespace glaubs.municipalities.controllers
*/
(function () {
  'use strict';

  angular
    .module('glaubs.mailings.controllers')
    .controller('MailingsController', MailingsController);

  MailingsController.$inject = ['$location', '$scope', '$routeParams', '$timeout', 'Mailings', 'Municipalities'];

  /**
  * @namespace MailingsController
  */
  function MailingsController($location, $scope, $routeParams, $timeout, Mailings, Municipalities) {
    var vm = this;
    vm.municipality_id = $routeParams.municipality_id;
    vm.mailing_id = $routeParams.mailing_id;
    vm.is_new_mailing = vm.mailing_id == 'new';

    $scope.mailing = {};
    $scope.mailings = [];

    function refresh(new_state) {
        Municipalities.load_one(vm.municipality_id, function(municipality) {
            $scope.municipality = municipality;
        });
        if(vm.is_new_mailing) {
            Mailings.get_max_number().success(function(resp) {
                $scope.mailing.from_number = resp['max_number'] + 1;
                angular.element('#createMailing__to_number').focus();
            });
        } else {
            Mailings.load_one(vm.municipality_id, vm.mailing_id).success(function(mailing) {
                if (new_state !== null) {
                    // things happen in parallel, so the server may not have the new state just yet
                    mailing.state = new_state;
                }
                $scope.mailing = mailing;

                if (mailing.state === 'new') {
                    $timeout(function() {
                        angular.element('#createMailing__generate_pdf').focus();
                    });
                }
            });
        }
        Mailings.load(vm.municipality_id, function(mailings) {
            mailings.forEach(function(mailing) {
                if (mailing.sent_on !== null) {
                    mailing.sent_on = Date.parse(mailing.sent_on);
                }
                if (mailing.received_on !== null) {
                    mailing.received_on = Date.parse(mailing.received_on);
                }
            });
            $scope.mailings = mailings;
        });
    }

    refresh(null);

    vm.createMailing = createMailing;
    vm.deleteMailing = deleteMailing;
    vm.refresh = refresh;

    /**
    * @memberOf glaubs.mailings.controllers.MailingsController
    */
    function createMailing() {
        Mailings.create(vm.municipality_id, {
            from_number: $scope.mailing.from_number,
            to_number: $scope.mailing.to_number,
            number_of_signatures: $scope.mailing.number_of_signatures,
        }).success(function(mailing) {
            $location.path('/municipalities/' + vm.municipality_id + '/mailings/' + mailing.pk);
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
