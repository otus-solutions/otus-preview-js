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

        return mapper(item, trackingItem, filling);
      });

      self.itemsCount = self.itemContainer.length;


      return self;
    }

    function mapper(item, trackingItem, filling) {
      let objectType = item.objectType;

      switch (objectType) {
        case "TextItem": return new TextItemVisualization(item, trackingItem, filling);
          break;
        case "ImageItem": return new ImageItemVisualization(item, trackingItem, filling);
          break;
        default: return new DefaultQuestionVisualization(item, trackingItem, filling);
      }
    }

    function TextItemVisualization(item, navigationTrackingItem, filling) {
      var self = new SurveyItemVisualization(item, navigationTrackingItem, filling);


      self.value = item.value;
      return self;
    }

    function ImageItemVisualization(item, navigationTrackingItem, filling) {
      var self = new SurveyItemVisualization(item, navigationTrackingItem, filling);

      self.value = item.url;
      return self;
    }

    function DefaultQuestionVisualization(item, navigationTrackingItem, filling) {
      var self = new SurveyItemVisualization(item, navigationTrackingItem, filling);

      self.dataType = item.dataType;

      self.isAnswered = !!filling; //answer or metadata

      if (filling) {
        self.forceAnswer = filling.forceAnswer;
        self.answer = filling.answer;
        self.hasAnswer = filling.answer.isFilled();
        self.hasMetadata = filling.metadata.isFilled();
        if (self.hasMetadata) {
          self.metadata = item.metadata.options.find(metadata => metadata.value.toString() === filling.metadata.value.toString());
        }

        self.comment = filling.comment;
        self.hasComment = !!self.comment;
      }

      return self;
    }

    function SurveyItemVisualization(item, navigationTrackingItem, filling) {
      var self = this;

      self.objectType = item.objectType;
      self.templateID = item.templateID;
      self.customID = item.customID;
      self.label = item.label;
      self.isQuestion = item.isQuestion();


      self.navigationState = navigationTrackingItem.getState();
      self.index = navigationTrackingItem.getIndex();
      self.isIgnored = navigationTrackingItem.isIgnored; //answer or metadata
      self.isSkipped = navigationTrackingItem.isSkipped;


      //ux
      self.navigationStatusIcon = undefined;


      return self;
    }

    return self;

  }

}());
