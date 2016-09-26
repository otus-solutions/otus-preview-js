describe('AheadActionService', function() {

  let Mock = {};
  let Injections = {};
  let service = {};

  beforeEach(function() {
    module('otusjs.player.core');

    inject(function(_$injector_) {
      mockPreAheadActionService(_$injector_);
      mockExecutionAheadActionService(_$injector_);
      mockPostAheadActionService(_$injector_);
      service = _$injector_.get('otusjs.player.core.player.AheadActionService', Injections);
    });
  });

  describe('execute method', function() {

    beforeEach(function() {
      spyOn(Mock.PreAheadActionService, 'execute');
      spyOn(Mock.ExecutionAheadActionService, 'execute');
      spyOn(Mock.PostAheadActionService, 'execute');
    })

    it('should execute PreAheadActionService', function() {
      service.execute();

      expect(Mock.PreAheadActionService.execute).toHaveBeenCalledWith();
    });

    it('should execute ExecutionAheadActionService', function() {
      service.execute();

      expect(Mock.ExecutionAheadActionService.execute).toHaveBeenCalledWith();
    });

    it('should execute PostAheadActionService', function() {
      service.execute();

      expect(Mock.PostAheadActionService.execute).toHaveBeenCalledWith();
    });

  });

  function mockPreAheadActionService($injector) {
    Mock.PreAheadActionService = $injector.get('otusjs.player.core.player.PreAheadActionService');
    Injections.PreAheadActionService = Mock.PreAheadActionService;
  }

  function mockExecutionAheadActionService($injector) {
    Mock.ExecutionAheadActionService = $injector.get('otusjs.player.core.player.ExecutionAheadActionService');
    Injections.ExecutionAheadActionService = Mock.ExecutionAheadActionService;
  }

  function mockPostAheadActionService($injector) {
    Mock.PostAheadActionService = $injector.get('otusjs.player.core.player.PostAheadActionService');
    Injections.PostAheadActionService = Mock.PostAheadActionService;
  }
});
