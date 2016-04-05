(function () {
  'use strict';

  angular
    .module('glaubs.municipalities', [
      'glaubs.municipalities.controllers',
      'glaubs.municipalities-edit.controllers',
      'glaubs.municipalities.services',
      'glaubs.municipalities.directives',
    ]);

  angular
    .module('glaubs.municipalities.controllers', []);

  angular
    .module('glaubs.municipalities-edit.controllers', []);

  angular
    .module('glaubs.municipalities.services', []);

  angular
    .module('glaubs.municipalities.directives', []);
})();
