/**
* Returns controller
* @namespace glaubs.returns.controllers
*/
(function () {
  'use strict';

  angular
    .module('glaubs.returns.controllers')
    .controller('ReturnsController', ReturnsController);

  ReturnsController.$inject = ['$location', '$scope', '$sce', 'Returns', 'Mailings'];

  /**
  * @namespace ReturnsController
  */
  function ReturnsController($location, $scope, $sce, Returns, Mailings) {
    var vm = this;

    $scope.query = '';
    $scope.mailings = null;

    angular.element('#searchMailing__query').focus()

    vm.searchMailing = searchMailing;

    function searchMailing() {
        if ($scope.query !== '') {
            Returns.search($scope.query)
                .success(function(mailings) {
                    $scope.mailings = mailings;
                    if (mailings.length == 1) {
                        $location.path('/municipalities/' + mailings[0].municipality + '/mailings/' + mailings[0].pk);
                    } else {
                        $scope.mailings = mailings;
                    }
                });
        } else {
            $scope.mailings = [];
        }
    }

  }
})();
