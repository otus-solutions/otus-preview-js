(function () {
  'use strict';

  angular
    .module('otusjs.player.data.visualization')
    .factory('SurveyItemVisualizationFactory', Factory);

  function Factory() {
    var self = this;

    self.create = create;

    function create() {
      return new SurveyItemVisualization();
    }

    function SurveyItemVisualization() {
      var self = this;

      self.customID = undefined;
      self.label = undefined;
      self.answer = undefined;
      self.metadata = undefined;
      self.isAnswerOrMetadata = undefined;
      self.commentary = undefined;
      self.navigationStatus = undefined;
      self.navigationStatus = undefined;


      //ux
      self.navigationStatusIcon = undefined;


      return self;
    }

    return self;

  }

}());
