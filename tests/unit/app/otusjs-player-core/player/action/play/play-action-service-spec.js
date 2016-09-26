describe('PlayActionService', function() {

  let Mock = {};
  let Injections = {};
  let service = {};

  beforeEach(function() {
    module('otusjs.player.core');

    inject(function(_$injector_) {
      mockPrePlayActionService(_$injector_);
      mockExecutionPlayActionService(_$injector_);
      mockPostPlayActionService(_$injector_);
      service = _$injector_.get('otusjs.player.core.player.PlayActionService', Injections);
    });
  });

  describe('execute method', function() {

    beforeEach(function() {
      spyOn(Mock.PrePlayActionService, 'execute');
      spyOn(Mock.ExecutionPlayActionService, 'execute');
      spyOn(Mock.PostPlayActionService, 'execute');
    })

    it('should execute PrePlayActionService', function() {
      service.execute();

      expect(Mock.PrePlayActionService.execute).toHaveBeenCalledWith();
    });

    it('should execute ExecutionPlayActionService', function() {
      service.execute();

      expect(Mock.ExecutionPlayActionService.execute).toHaveBeenCalledWith();
    });

    it('should execute PostPlayActionService', function() {
      service.execute();

      expect(Mock.PostPlayActionService.execute).toHaveBeenCalledWith();
    });

  });

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
