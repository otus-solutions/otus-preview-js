describe('PlayActionService', function() {

  let Mock = {};
  let Injections = {};
  let service = {};

  beforeEach(function() {
    module('otusjs.player.core');

    inject(function(_$injector_) {
      mockActionPipeService(_$injector_);
      mockPrePlayActionService(_$injector_);
      mockExecutionPlayActionService(_$injector_);
      mockPostPlayActionService(_$injector_);
      service = _$injector_.get('otusjs.player.core.player.PlayActionService', Injections);
    });
  });

  describe('execute method', function() {

    beforeEach(function() {
      spyOn(Mock.PrePlayActionService, 'execute').and.returnValue(Mock.ActionPipeService.flowData);
      spyOn(Mock.ExecutionPlayActionService, 'execute').and.returnValue(Mock.ActionPipeService.flowData);
      spyOn(Mock.PostPlayActionService, 'execute').and.returnValue(Mock.ActionPipeService.flowData);
    })

    it('should execute PrePlayActionService', function() {
      service.execute();

      expect(Mock.PrePlayActionService.execute).toHaveBeenCalledWith(Mock.ActionPipeService.flowData);
    });

    it('should execute ExecutionPlayActionService', function() {
      service.execute();

      expect(Mock.ExecutionPlayActionService.execute).toHaveBeenCalledWith(Mock.ActionPipeService.flowData);
    });

    it('should execute PostPlayActionService', function() {
      service.execute();

      expect(Mock.PostPlayActionService.execute).toHaveBeenCalledWith(Mock.ActionPipeService.flowData);
    });

  });

  function mockActionPipeService($injector) {
    Mock.ActionPipeService = $injector.get('otusjs.player.core.player.ActionPipeService');

    Mock.ActionPipeService.flowData = {};

    Injections.ActionPipeService = Mock.ActionPipeService;
  }

  function mockPrePlayActionService($injector) {
    Mock.PrePlayActionService = $injector.get('otusjs.player.core.player.PrePlayActionService');
    Injections.PrePlayActionService = Mock.PrePlayActionService;
  }

  function mockExecutionPlayActionService($injector) {
    Mock.ExecutionPlayActionService = $injector.get('otusjs.player.core.player.ExecutionPlayActionService');
    Injections.ExecutionPlayActionService = Mock.ExecutionPlayActionService;
  }

  function mockPostPlayActionService($injector) {
    Mock.PostPlayActionService = $injector.get('otusjs.player.core.player.PostPlayActionService');
    Injections.PostPlayActionService = Mock.PostPlayActionService;
  }
});
