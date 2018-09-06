describe('text question view controller component', function () {
  var Mock = {};
  var controller;
  var Injections = {};

  beforeEach(function () {
    mockInjections();
    angular.mock.module('otusjs.player.component', function ($provide) {
      $provide.value('otusjs.player.data.activity.CurrentItemService', Mock.CurrentItemService);
      $provide.value('$element', {});
    });

    inject(function (_$controller_, _$injector_) {
      mockController(_$controller_, _$injector_);
    });
    mockBindings();
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
    Injections.CurrentItemService = Mock.CurrentItemService;
    Injections.$element = {};
    controller = _$controller_('otusTextQuestionCtrl', Injections);
  }

  function mockInjections() {
    Mock.CurrentItemService = {
      getFilling: function () {
        return {
          answer:{
            value: null
          }
        };
      }
    };
  }

  function mockBindings() {
    Mock.itemData = {
      data: {
        answer: {
          value: 1
        }
      }
    };
    controller.itemData = Mock.itemData;
  }
});
