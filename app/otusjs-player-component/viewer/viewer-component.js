(function () {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusViewer', {
      templateUrl: 'app/otusjs-player-component/viewer/viewer-template.html',
      controller: Controller
    });

  Controller.$inject = [
    'otusjs.player.data.viewer.SurveyViewFactory',
    'otusjs.player.core.player.PlayerService'
  ];

  function Controller(SurveyViewerFactory, PlayerService) {
    var SURVEY_ITEM = '<otus-survey-item item-data="item" />';
    var self = this;

    self.$onInit = onInit;
    self.ready = false;

    /* Public methods */
    self.exit = exit;

    function onInit() {
      self.activityData = SurveyViewerFactory.create();
      console.log(self);

      self.name = 'breno';
      self.test = '<span>{{$ctrl.name}}</span>';

      self.ready = true;

    }

    function exit() {
      PlayerService.stop();
    }

    self.filters = {};
  }
}());

(function () {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusViewerFilters', {
      templateUrl: 'app/otusjs-player-component/viewer/viewer-filters-template.html',
      controller: Controller,
      bindings: {
        filters: '='
      }
    });

  function Controller() {
    var self = this;
    self.$onInit = onInit;

    function onInit() {
      console.log(self.filters);
    }
  }
}());

(function () {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('surveyItemViewTemplate', {
      templateUrl: 'app/otusjs-player-component/viewer/survey-item-viewer-template.html',
      controller: Controller,
      bindings: {
        item: '='
      }
    });

  Controller.$inject = [
    'otusjs.player.core.renderer.HtmlBuilderService',
    'otusjs.player.core.renderer.TagComponentBuilderService'
  ];

  function Controller(HtmlBuilderService, TagComponentBuilderService) {
    var self = this;
    self.$onInit = onInit;

    function onInit() {
      let _templateName = HtmlBuilderService.generateTagName(self.item.templateName);
      self.template = '<' + _templateName + ' item="$ctrl.item"/>';
      console.log(self.template);
    }
  }
}());

(function () {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('questionView', {
      templateUrl: 'app/otusjs-player-component/viewer/question-view-template.html',
      controller: Controller,
      bindings: {
        item: '='
      }
    });


  function Controller() {
    var self = this;
    self.$onInit = onInit;

    function onInit() {

    }
  }

}());

(function () {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('checkboxQuestionView', {
      templateUrl: 'app/otusjs-player-component/viewer/question-view-template.html',
      controller: Controller,
      bindings: {
        item: '='
      }
    });


  function Controller() {
    var self = this;
    self.$onInit = onInit;

    function onInit() {

    }
  }

}());

(function () {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('singleSelectionQuestionView', {
      templateUrl: 'app/otusjs-player-component/viewer/question-view-template.html',
      controller: Controller,
      bindings: {
        item: '='
      }
    });


  function Controller() {
    var self = this;
    self.$onInit = onInit;

    function onInit() {

    }
  }

}());

(function () {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('textItemView', {
      templateUrl: 'app/otusjs-player-component/viewer/question-view-template.html',
      controller: Controller,
      bindings: {
        item: '='
      }
    });


  function Controller() {
    var self = this;
    self.$onInit = onInit;

    function onInit() {

    }
  }

}());

(function () {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('imageItemView', {
      templateUrl: 'app/otusjs-player-component/viewer/question-view-template.html',
      controller: Controller,
      bindings: {
        item: '='
      }
    });


  function Controller() {
    var self = this;
    self.$onInit = onInit;

    function onInit() {

    }
  }

}());
