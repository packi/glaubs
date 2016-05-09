(function () {
  'use strict';

  angular
    .module('glaubs', [
      'ui.bootstrap',
      'glaubs.config',
      'glaubs.routes',
      'glaubs.municipalities',
      'glaubs.mailings',
    ])
    .run(run);

  angular
    .module('glaubs.config', []);

  angular
    .module('glaubs.municipalities', []);

  angular
    .module('glaubs.mailings', []);

  angular
    .module('glaubs.routes', ['ngRoute']);


  /**
  * @name run
  * @desc Update xsrf $http headers to align with Django's defaults
  */
  function run($http) {
    $http.defaults.xsrfHeaderName = 'X-CSRFToken';
    $http.defaults.xsrfCookieName = 'csrftoken';
    $.material.init();
  }

})();

