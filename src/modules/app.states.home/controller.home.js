/**
 * @memberOf app.states.home
 */
(function (module) {
  'use strict';

  function HomeController($scope, statesService) {
    var controller = this;

    $scope.search = {query: '', result: [] };

    controller.search = function() {
      statesService.search($scope.search.query).then(function (results) {
        $scope.search.result = results;
      });
    }
  }

  module.controller('homeController', [
    '$scope',
    'statesService',
    HomeController
  ]);

}(angular.module('app.states.home')));
