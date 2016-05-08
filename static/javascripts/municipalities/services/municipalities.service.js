(function () {
    'use strict';
   
    angular
        .module('glaubs.municipalities.services')
        .factory('Municipalities', Municipalities);

    Municipalities.$inject = ['$http'];

    function Municipalities($http) {
        var Municipalities = {
            load: load,
            create: create,
            del: del,
            load_one: load_one,
            update: update,
            search: search,
            get_primary: get_primary,
            related: related,
        };

        return Municipalities;


        function load(callback) {
            $http.get('/api/v1/municipalities/').success(callback);
        }

        function load_one(id, callback) {
            $http.get('/api/v1/municipalities/' + id + '/').success(callback);
        }

        function create(name, zip_code, address, phone_number, comment) {
            return $http.post('/api/v1/municipalities/', {
                name: name,
                zip_code: zip_code,
                address: address,
                phone_number: phone_number,
                comment: comment,
            });
        }

        function get_primary(id) {
            return $http.get('/api/v1/municipalities/primary?id=' + id);
        }

        function related(id) {
            return $http.get('/api/v1/municipalities/related?id=' + id);
        }

        function search(query) {
            return $http.get('/api/v1/municipalities/search?q=' + query);
        }

        function update(id, municipality) {
            return $http.put('/api/v1/municipalities/' + id + '/', municipality);
        }

        function del(id) {
            return $http.delete('/api/v1/municipalities/' + id + '/');
        }


    }
})();

