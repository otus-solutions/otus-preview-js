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
    var self = this;

    self.$onInit = onInit;
    self.ready = false;
    self.filters = {};

    /* Public methods */
    self.exit = exit;

    function onInit() {
      self.activityData = SurveyViewerFactory.create();
      self.ready = true;
    }

    function exit() {
      PlayerService.stop();
    }

    function updateFilter() {

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
    'aservice'
  ];

  function Controller(HtmlBuilderService, service) {
    var self = this;
    self.$onInit = onInit;

    self.print = function () {
      service.print();
    };

    function onInit() {
      let _templateName = HtmlBuilderService.generateTagName(self.item.templateName);
      self.template = '<' + _templateName + ' item="$ctrl.item"/>';
    }

    function f() {

    }
  }
}());

(function () {
  'use strict';

  angular
    .module('otusjs.player.component')
    .service('aservice', Service);


  function Service() {
    var self = this;

    self.data = false;

    self.print = function () {
      console.log(self.data);
    };

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
    .component('gridIntegerQuestionView', {
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
    .component('gridTextQuestionView', {
      templateUrl: 'app/otusjs-player-component/viewer/question-view-template.html',
      controller: Controller,
      bindings: {
        item: '='
      }
    });

//todo: use the same component for both grid questions?
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
