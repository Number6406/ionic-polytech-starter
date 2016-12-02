/**
 * @memberOf app.states
 */
(function (module) {
  'use strict';

  function StatesService($q, httpService, i18nService) {
    var service = this;

    service.search = function(query) {
      console.log(query);
      return $q.resolve([
        { title: 'Retour vers le futur 5', id: 1 },
        { title: 'JPP', id: 2 },
        { title: 'JPP 2', id: 3 }
      ]);
    };

    service.getMovie = function(idMovie) {
      return $q.resolve({ title: 'JPP', id: idMovie });
    }

    /**
     * Resolve states data.
     * @return {Promise} Passing an object.
     */
    service.resolveStatesData = function () {
      return httpService.all({
        // Force loading of dynamic locale using the determined one.
        locale: i18nService.setLocale()
      });
    };
  }

  module.service('statesService', [
    '$q',
    'httpService',
    'i18nService',
    StatesService
  ]);

}(angular.module('app.states')));
