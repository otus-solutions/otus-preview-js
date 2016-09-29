describe('ApplyAnswerStepService', function() {

  var Mock = {};
  var Injections = {};
  var service = {};

  beforeEach(function() {
    module('otusjs.player.core');

    inject(function(_$injector_) {
      mockExecutionPipe();
      mockFlowData();
      mockActivityFacadeService(_$injector_);
      service = _$injector_.get('otusjs.player.core.player.ApplyAnswerStepService', Injections);
    });
  });

  describe('effect method', function() {

    beforeEach(function() {
      service.beforeEffect(Mock.pipe, Mock.flowData);
    })

    it('should call ActivityFacadeService.applyAnswer', function() {
      spyOn(Mock.ActivityFacadeService, 'applyAnswer');

      service.effect(Mock.pipe, Mock.flowData);

      expect(Mock.ActivityFacadeService.applyAnswer).toHaveBeenCalled();
    });

  });

  function mockExecutionPipe() {
    Mock.pipe = {};
  }

  function mockFlowData() {
    Mock.flowData = {};
    Mock.flowData.answerToEvaluate = {};
    Mock.flowData.answerToEvaluate.data = {};
  }

  function mockActivityFacadeService($injector) {
    Mock.itemFilling = {};
    Mock.itemFilling.answer = {};
    Mock.itemFilling.answer.value = {};
    Mock.ActivityFacadeService = $injector.get('otusjs.player.core.activity.ActivityFacadeService');
    let currentItem = {};
    currentItem.getFilling = () => { return Mock.itemFilling; };
    currentItem.shouldApplyAnswer = () => { return true; };

    spyOn(Mock.ActivityFacadeService, 'getCurrentItem').and.returnValue(currentItem);

    Injections.ActivityFacadeService = Mock.ActivityFacadeService;
  }
});
