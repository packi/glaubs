(function () {
  'use strict';

  angular
    .module('glaubs.reminders', [
      'glaubs.reminders.controllers',
      'glaubs.reminders_by_municipality.controllers',
      'glaubs.reminders.services',
    ]);

  angular
    .module('glaubs.reminders.controllers', []);

  angular
    .module('glaubs.reminders_by_municipality.controllers', []);

  angular
    .module('glaubs.reminders.services', []);

})();
