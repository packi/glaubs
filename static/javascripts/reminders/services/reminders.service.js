(function () {
    'use strict';
   
    angular
        .module('glaubs.reminders.services')
        .factory('Reminders', Reminders);

    Reminders.$inject = ['$http'];

    function Reminders($http) {
        var Reminders = {
            search: search,
            by_municipality: by_municipality,
        };

        return Reminders;

        function search(state) {
            return $http.get('/api/v1/mailings/reminders?state=' + state);
        }

        function by_municipality(state) {
            return $http.get('/api/v1/mailings/reminders/by_municipality?state=' + state);
        }
    }
})();

