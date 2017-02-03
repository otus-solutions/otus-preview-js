(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusSurveyCover', {
      templateUrl: 'app/otusjs-player-component/survey-cover/survey-cover-template.html',
      controller: Controller,
      bindings: {
        onPlay: '&'
      }
    });

  Controller.$inject = [
    '$scope',
    '$element',
    'otusjs.player.data.activity.ActivityFacadeService'
  ];

  function Controller($scope, $element, ActivityFacadeService) {
    var self = this;

    /* Public methods */
    self.$onInit = onInit;
    self.play = play;
    self.show = show;
    self.remove = remove;

    function onInit() {
      $scope.$parent.$ctrl.playerCover = self;
      var activity = ActivityFacadeService.getCurrentSurvey().getSurvey();
      self.title = activity.getName();
    }

    function play() {
      self.onPlay();
    }

    function show() {
      var activity = ActivityFacadeService.getCurrentSurvey().getSurvey();
      self.title = activity.getName();
    }

    function remove() {
      $element.remove();
    }
  }
}());
