describe('grid text question view controller component', function () {
  var Mock = {};
  var controller;
  var Injections = {};

  beforeEach(function () {
    mockInjections();
    mockBindings();
    angular.mock.module('otusjs.player.component', function ($provide) {
      $provide.value('otusjs.player.data.activity.CurrentItemService', Mock.CurrentItemService);
    });

    inject(function (_$controller_) {
      mockController(_$controller_);
    });

  });

  describe('the initialization', function () {
    beforeEach(function () {
      spyOn(Mock.CurrentItemService, 'getFilling').and.returnValue(Mock.arrayAnswer);
    });
    it('should have a defined controller', function () {
      expect(controller).toBeDefined();
    });

    it('should build an new component with values', function () {
      expect(controller.view).toEqual(false);
    });


  });

  //mock functions
  function mockController(_$controller_) {
    Injections = [Mock.CurrentItemService]
    controller = _$controller_('otusGridTextQuestionCtrl', Injections);

  }

  function mockInjections() {
    Mock.CurrentItemService = {
      getFilling: function () {
        return Mock.answerArray;
      }
    };
  }

  function mockBindings() {
    Mock.nullAnswer = {
      answer: {
        value: null
      }
    };
    Mock.answerArray = {
      answer: {
        value: [
          [
            {"objectType": "GridIntegerAnswer", "customID": "TST31a", "value": 5},
            {"objectType": "GridIntegerAnswer", "customID": "TST31b", "value": 5},
            {"objectType": "GridIntegerAnswer", "customID": "TST31c", "value": 5}
          ]
        ]
      }

    };

  }


});
