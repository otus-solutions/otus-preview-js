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
  }

  function mockActivityFacadeService($injector) {
    Mock.ActivityFacadeService = $injector.get('otusjs.player.core.activity.ActivityFacadeService');
    Injections.ActivityFacadeService = Mock.ActivityFacadeService;
  }
});
