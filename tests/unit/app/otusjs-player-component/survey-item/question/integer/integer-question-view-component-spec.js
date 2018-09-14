describe('integer question view controller component', function () {
  var Mock = {};
  var controller;

  beforeEach(function () {
    angular.mock.module('otusjs.player.component');

    inject(function (_$controller_) {
      mockController(_$controller_);
    });

    mockBindings();

  });

  describe('the inicialization', function () {
    it('shold have a defined controller', function () {
      expect(controller).toBeDefined();
    });

    it('should build an new component with values', function () {
      controller.$onInit();
      expect(controller.answer).toEqual(1);
      expect(controller.view).toEqual(true);
    });
  });

  //mock functions
  function mockController(_$controller_) {
    controller = _$controller_('otusIntegerQuestionViewCtrl');
  }

  function mockBindings() {
    Mock.itemData = {
      data: {
        answer: {
          value: 1
        }
      }
    }
    controller.itemData = Mock.itemData;
  }
});
