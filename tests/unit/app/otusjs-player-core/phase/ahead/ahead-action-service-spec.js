describe('AheadActionService', function() {

  var Mock = {};
  var Injections = {};
  var service = {};

  beforeEach(function() {
    module('otusjs.player.core');

    inject(function(_$injector_) {
      mockActionPipeService(_$injector_);
      mockPreAheadActionService(_$injector_);
      mockExecutionAheadActionService(_$injector_);
      mockPostAheadActionService(_$injector_);
      service = _$injector_.get('otusjs.player.core.phase.AheadActionService', Injections);
    });
  });

  describe('execute method', function() {

    beforeEach(function() {
      spyOn(Mock.PreAheadActionService, 'execute').and.returnValue(Mock.ActionPipeService.flowData);
      spyOn(Mock.ExecutionAheadActionService, 'execute').and.returnValue(Mock.ActionPipeService.flowData);
      spyOn(Mock.PostAheadActionService, 'execute').and.returnValue(Mock.ActionPipeService.flowData);
    })

    it('should execute PreAheadActionService', function() {
      service.execute();

      expect(Mock.PreAheadActionService.execute).toHaveBeenCalledWith(Mock.ActionPipeService.flowData);
    });

    it('should execute ExecutionAheadActionService', function() {
      service.execute();

      expect(Mock.ExecutionAheadActionService.execute).toHaveBeenCalledWith(Mock.ActionPipeService.flowData);
    });

    it('should execute PostAheadActionService', function() {
      service.execute();

      expect(Mock.PostAheadActionService.execute).toHaveBeenCalledWith(Mock.ActionPipeService.flowData);
    });

  });

  function mockActionPipeService($injector) {
    Mock.ActionPipeService = $injector.get('otusjs.player.core.phase.ActionPipeService');

    Mock.ActionPipeService.flowData = {};

    Injections.ActionPipeService = Mock.ActionPipeService;
  }

  function mockPreAheadActionService($injector) {
    Mock.PreAheadActionService = $injector.get('otusjs.player.core.phase.PreAheadActionService');
    Injections.PreAheadActionService = Mock.PreAheadActionService;
  }

  function mockExecutionAheadActionService($injector) {
    Mock.ExecutionAheadActionService = $injector.get('otusjs.player.core.phase.ExecutionAheadActionService');
    Injections.ExecutionAheadActionService = Mock.ExecutionAheadActionService;
  }

  function mockPostAheadActionService($injector) {
    Mock.PostAheadActionService = $injector.get('otusjs.player.core.phase.PostAheadActionService');
    Injections.PostAheadActionService = Mock.PostAheadActionService;
  }
});
