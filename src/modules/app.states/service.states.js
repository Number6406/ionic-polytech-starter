/**
 * @memberOf app.states
 */
(function (module) {
  'use strict';

  function StatesService(
    $q,
    httpService,
    i18nService,
    API_IMAGES_URL,
    API_KEY
  ) {
    var service = this;

    service.searchMovie = function (query) {
      return httpService.get('/3/search/movie', {
        language: i18nService.getLocale(),
        api_key: API_KEY,
        query: query
      }).then(function (data) {
        return data.results;
      });

      /*
      console.log(query);
      return $q.resolve([
        { title: 'Retour vers le futur 5', id: 1 },
        { title: 'JPP', id: 2 },
        { title: 'JPP 2', id: 3 }
      ]);
      */
    };

    service.getMovie = function (idMovie) {
      return httpService.get('/3/movie/' + idMovie, {
        language: i18nService.getLocale(),
        api_key: API_KEY
      });
    };

    service.discoverMovie = function () {
      return httpService.get('/3/discover/movie', {
        'release_date.lte': moment().add(12, 'months').format('YYYY-MM-DD'),
        'release_date.gte': moment().format('YYYY-MM-DD'),
        with_genres: '878',
        language: i18nService.getLocale(),
        api_key: API_KEY
      }).then(function (data) {
        return _.sample(data.results) || $q.reject();
      });
    };

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
    'API_IMAGES_URL',
    'API_KEY',
    StatesService
  ]);

}(angular.module('app.states')));
