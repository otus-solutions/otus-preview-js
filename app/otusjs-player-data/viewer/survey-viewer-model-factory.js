(function () {
  'use strict';

  angular
    .module('otusjs.player.data.viewer')
    .factory('otusjs.player.data.viewer.SurveyViewFactory', Factory);

  Factory.$inject = [
    'otusjs.model.activity.ActivityFacadeService'
  ];

  function Factory(ActivityFacadeService) {
    var self = this;

    self.create = create;

    function create() {
      return new ActivityView(ActivityFacadeService);
    }

    function ActivityView(ActivityFacadeService) {
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
          return new TextItemView(item, trackingItem, filling);
          break;
        case 'ImageItem':
          return new ImageItemView(item, trackingItem, filling);
          break;
        case 'CheckboxQuestion':
          return new CheckboxQuestionView(item, trackingItem, filling);
          break;
        case 'SingleSelectionQuestion':
          return new SingleSelectionQuestionView(item, trackingItem, filling);
          break;
        default:
          return new QuestionView(item, trackingItem, filling);
      }
    }

    function GridIntegerQuestionView(item, navigationTrackingItem, filling) {
      
    }

    function TextItemView(item, navigationTrackingItem, filling) {
      var self = new SurveyItemView(item, navigationTrackingItem, filling);

      self.templateName = 'textItemView';

      self.value = item.value;
      console.log(self);
      return self;
    }

    function ImageItemView(item, navigationTrackingItem, filling) {
      var self = new SurveyItemView(item, navigationTrackingItem, filling);

      self.templateName = 'imageItemView';

      self.value = item.url;
      console.log(self);
      return self;
    }

    function CheckboxQuestionView(item, navigationTrackingItem, filling) {
      var self = new QuestionView(item, navigationTrackingItem, filling);

      self.templateName = "checkboxQuestionView";

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

    function SingleSelectionQuestionView(item, navigationTrackingItem, filling) {
      var self = new QuestionView(item, navigationTrackingItem, filling);

      self.templateName = "singleSelectionQuestionView";

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

    function QuestionView(item, navigationTrackingItem, filling) {
      var self = new SurveyItemView(item, navigationTrackingItem, filling);

      self.dataType = item.dataType;
      self.templateName = "questionView";

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

    function SurveyItemView(item, navigationTrackingItem, filling) {
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
