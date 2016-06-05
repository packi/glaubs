(function () {
    'use strict';
   
    angular
        .module('glaubs.returns.services')
        .factory('Returns', Returns);

    Returns.$inject = ['$http'];

    function Returns($http) {
        var Returns = {
            search: search,
        };

        return Returns;

        function search(q) {
            return $http.get('/api/v1/mailings/search?q=' + q);
        }

    }
})();

