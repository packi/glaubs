(function () {
    'use strict';
   
    angular
        .module('glaubs.mailings.services')
        .factory('Mailings', Mailings);

    Mailings.$inject = ['$http'];

    function Mailings($http) {
        var Mailings = {
            load: load,
            create: create,
            del: del,
            load_one: load_one,
            update: update,
            get_max_number: get_max_number,
            mark: mark,
        };

        return Mailings;


        function load(municipality_id, callback) {
            $http.get('/api/v1/municipalities/' + municipality_id + '/mailings/').success(callback);
        }

        function get_max_number() {
            return $http.get('/api/v1/mailings/max_to_number');
        }

        function load_one(municipality_id, id) {
            return $http.get('/api/v1/municipalities/' + municipality_id + '/mailings/' + id + '/');
        }

        function create(municipality_id, mailing) {
            return $http.post('/api/v1/municipalities/' + municipality_id + '/mailings/', mailing);
        }

        function update(municipality_id, id, mailing) {
            return $http.put('/api/v1/municipalities/' + municipality_id + '/mailings/' + id + '/', mailing);
        }

        function del(municipality_id, id) {
            return $http.delete('/api/v1/municipalities/' + municipality_id + '/mailings/' + id + '/');
        }

        function mark(municipality_id, as, state) {
            return $http.post('/api/v1/municipalities/' + municipality_id + '/mailings/mark?as=' + as + '&state=' + state);
        }

    }
})();

