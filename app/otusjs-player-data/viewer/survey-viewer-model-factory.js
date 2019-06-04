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
        case 'TextItem':
          return new TextItemVisualization(item, trackingItem, filling);
          break;
        case 'ImageItem':
          return new ImageItemVisualization(item, trackingItem, filling);
          break;
        case 'CheckboxQuestion':
          return new CheckboxQuestionVisualization(item, trackingItem, filling);
          break;
        case 'SingleSelectionQuestion':
          return new SingleSelectionQuestionVisualization(item, trackingItem, filling);
          break;
        default:
          return new QuestionVisualization(item, trackingItem, filling);
      }
    }

    function TextItemVisualization(item, navigationTrackingItem, filling) {
      var self = new SurveyItemVisualization(item, navigationTrackingItem, filling);


      self.value = item.value;
      console.log(self);
      return self;
    }

    function ImageItemVisualization(item, navigationTrackingItem, filling) {
      var self = new SurveyItemVisualization(item, navigationTrackingItem, filling);

      self.value = item.url;
      console.log(self);
      return self;
    }

    function CheckboxQuestionVisualization(item, navigationTrackingItem, filling) {
      var self = new QuestionVisualization(item, navigationTrackingItem, filling);

      if (filling && filling.answer) {
        self.answer = item.options.map(item => {
          item.value = filling.answer.value.find(value => value.option === item.customOptionID).state;
          return item;
        });
      } else {
        self.answer = item.options;
      }


      return self;
    }

    function SingleSelectionQuestionVisualization(item, navigationTrackingItem, filling) {
      var self = new QuestionVisualization(item, navigationTrackingItem, filling);

      if (filling && filling.answer) {
        self.answer = item.options.map(op => {
          if (op.value.toString() === filling.answer.value.toString()) {
            op.value = 1;
          } else {
            op.value = 0;
          }
          return op;
        });
      } else {
        self.answer = item.options.map(op => {
          op.value = 0;
          return op;
        });
      }


      return self;
    }

    function QuestionVisualization(item, navigationTrackingItem, filling) {
      var self = new SurveyItemVisualization(item, navigationTrackingItem, filling);

      self.dataType = item.dataType;

      self.forceAnswer = undefined;
      self.answer = undefined;
      self.hasAnswer = undefined;
      self.hasMetadata = undefined;
      self.metadata = undefined;
      self.comment = undefined;
      self.hasComment = undefined;

      self.isAnswered = !!filling; //answer, metadata or comment

      if (self.isAnswered) {
        self.forceAnswer = filling.forceAnswer;
        self.answer = filling.answer.value;
        self.hasAnswer = filling.answer.isFilled();
        self.hasMetadata = filling.metadata.isFilled();
        if (self.hasMetadata) {
          self.metadata = item.metadata.options.find(metadata => metadata.value.toString() === filling.metadata.value.toString());
        }

        self.comment = filling.comment;
        self.hasComment = !!self.comment;
      }

      console.log(self);
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
      self.isIgnored = navigationTrackingItem.isIgnored(); //answer or metadata
      self.isSkipped = navigationTrackingItem.isSkipped();


      //ux
      self.navigationStatusIcon = undefined;


      return self;
    }

    return self;

  }

}());
