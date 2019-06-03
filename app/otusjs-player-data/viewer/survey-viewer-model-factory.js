(function () {
  'use strict';

  angular
    .module('otusjs.player.data.viewer')
    .factory('otusjs.player.data.viewer.SurveyViewerFactory', Factory);

  Factory.$inject = [
    'otusjs.model.activity.ActivityFacadeService'
  ];

  function Factory(ActivityFacadeService) {
    var self = this;

    self.create = create;

    function create() {
      return new ActivityVisualization(ActivityFacadeService);
    }

    function ActivityVisualization(ActivityFacadeService) {
      var self = this;

      let act = ActivityFacadeService.surveyActivity;
      self.acronym = act.getIdentity().acronym;
      self.name = act.getName();
      self.participantData = act.participantData;
      self.lastStatus = act.statusHistory.getLastStatus();  //todo improve
      self.mode = act.mode;


      let items = ActivityFacadeService.surveyActivity.getItems();
      let navigationTrackerItems = ActivityFacadeService.getNavigationTracker().getItems();

      self.itemContainer = items.map(item => {
        let trackingItem = navigationTrackerItems[item.templateID];
        let filling = ActivityFacadeService.getFillingByQuestionID(item.templateID);  //todo check for performance

        return new SurveyItemVisualization(item, trackingItem, filling);
      });

      self.itemsCount = self.itemContainer.length;


      return self;
    }

    function SurveyItemVisualization(item, navigationTrackingItem, filling) {
      var self = this;

      self.templateID = item.templateID;
      self.customID = item.customID;
      self.label = item.label;
      self.isQuestion = item.isQuestion();
      self.dataType = item.dataType;

      //todo; else what?
      if (filling) {
        self.forceAnswer = filling.forceAnswer;
        self.answer = filling.answer;
        self.hasAnswer = filling.answer.isFilled();
        self.metadata = filling.metadata;
        self.hasMetadata = filling.metadata.isFilled();
        self.comment = filling.comment;
        self.hasComment = !!self.comment;
      }
      self.navigationState = navigationTrackingItem.getState();
      self.index = navigationTrackingItem.getIndex();
      self.isAnswered = navigationTrackingItem.isAnswered; //answer or metadata
      self.isIgnored = navigationTrackingItem.isIgnored; //answer or metadata
      self.isSkipped = navigationTrackingItem.isSkipped; //answer or metadata


      //ux
      self.navigationStatusIcon = undefined;


      return self;
    }

    return self;

  }

}());
