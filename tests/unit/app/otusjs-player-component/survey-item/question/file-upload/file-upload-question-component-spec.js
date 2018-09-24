describe('file upload question controller component', function () {
  var Mock = {};
  var controller;

  beforeEach(function () {
    mockBindings();
    mockInjections();
    angular.mock.module('otusjs.player.component', function ($provide) {
      $provide.value('otusjs.player.data.activity.CurrentItemService', Mock.CurrentItemService);
      $provide.value('otusjs.surveyItem.customAnswer.FileUploadAnswerFactory', Mock.FileUploadAnswerFactory);
      $provide.value('otusjs.utils.FileUploadFactory', Mock.FileUploadService);
      $provide.value('$scope', Mock.scope);
    });

    inject(function (_$controller_) {
      mockController(_$controller_);
    });

  });


  describe('the initialization', function () {
    it('should have a defined controller', function () {
      expect(controller).toBeDefined();
    });

    it('should build an new component with values', function () {
      expect(controller.view).toEqual(false);
    });

  });

  //mock functions
  function mockController(_$controller_) {
    Mock.Injections = {
      CurrentItemService: Mock.CurrentItemService,
      FileUploadService: Mock.FileUploadService,
      $scope: Mock.scope,
      FileUploadAnswerFactory: Mock.FileUploadAnswerFactory
    }
    controller = _$controller_('otusFileUploadQuestionCtrl', Mock.Injections);
    controller.itemData = Mock.itemData;
  }

  function mockInjections() {

    Mock.CurrentItemService = {
      getFilling: function () {
        return Mock.itemData.data;
      }
    };

    Mock.FileUploadAnswerFactory = {
      buildFromJson: function () {
        return [Mock.itemData.data];
      }
    };

    Mock.FileUploadService = {
      getUploadInterface: function () {
        var self = this;
        self.getFile = function () {
          return Promise.resolve("http://download");
        };
        return self;
      }
    };


    Mock.scope = {
      $root: {
        $$phase: ""
      },
      $apply: function () {

      }
    };
  }

  function mockBindings() {
    Mock.itemData = {
      "data": {
        "answer": {
          "value": [
            {
              "objectType": "FileAnswer",
              "name": "ELSABOX.txt",
              "size": 30,
              "type": "text/plain",
              "sentDate": "2017-10-03T19:39:52.380Z",
              "oid": ""
            }
          ]
        }
      }
    };


  }


});
