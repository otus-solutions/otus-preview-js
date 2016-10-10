describe('PlayerConfigurationService', function() {

  var Mock = {};
  var Injections = {};
  var service = {};

  beforeEach(function() {
    module('otusjs.player.core');

    inject(function(_$injector_) {
      mockChainLink(_$injector_);

      mockPlayerStartActionService(_$injector_);
      mockPrePlayerStartActionService(_$injector_);
      mockExecutionPlayerStartActionService(_$injector_);
      mockPostPlayerStartActionService(_$injector_);

      mockPlayActionService(_$injector_);
      mockPrePlayActionService(_$injector_);
      mockExecutionPlayActionService(_$injector_);
      mockPostPlayActionService(_$injector_);

      mockAheadActionService(_$injector_);
      mockPreAheadActionService(_$injector_);
      mockExecutionAheadActionService(_$injector_);
      mockPostAheadActionService(_$injector_);

      service = _$injector_.get('otusjs.player.core.player.PlayerConfigurationService', Injections);
    });
  });

  describe('onPrePlayerStart method', function() {

    it('should pipe the step on PrePlayerStartActionService', function() {
      spyOn(Mock.PrePlayerStartActionService, 'pipe');

      service.onPrePlayerStart(Mock.step);

      expect(Mock.PrePlayerStartActionService.pipe).toHaveBeenCalledWith(Mock.step);
    });

  });

  describe('onPlayerStart method', function() {

    it('should pipe the step on ExecutionPlayerStartActionService', function() {
      spyOn(Mock.ExecutionPlayerStartActionService, 'pipe');

      service.onPlayerStart(Mock.step);

      expect(Mock.ExecutionPlayerStartActionService.pipe).toHaveBeenCalledWith(Mock.step);
    });

  });

  describe('onPostPlayerStart method', function() {

    it('should pipe the step on PostPlayerStartActionService', function() {
      spyOn(Mock.PostPlayerStartActionService, 'pipe');

      service.onPostPlayerStart(Mock.step);

      expect(Mock.PostPlayerStartActionService.pipe).toHaveBeenCalledWith(Mock.step);
    });

  });

  describe('onPrePlay method', function() {

    it('should pipe the step on PrePlayActionService', function() {
      spyOn(Mock.PrePlayActionService, 'pipe');

      service.onPrePlay(Mock.step);

      expect(Mock.PrePlayActionService.pipe).toHaveBeenCalledWith(Mock.step);
    });

  });

  describe('onPlay method', function() {

    it('should pipe the step on ExecutionPlayActionService', function() {
      spyOn(Mock.ExecutionPlayActionService, 'pipe');

      service.onPlay(Mock.step);

      expect(Mock.ExecutionPlayActionService.pipe).toHaveBeenCalledWith(Mock.step);
    });

  });

  describe('onPostPlay method', function() {

    it('should pipe the step on PostPlayActionService', function() {
      spyOn(Mock.PostPlayActionService, 'pipe');

      service.onPostPlay(Mock.step);

      expect(Mock.PostPlayActionService.pipe).toHaveBeenCalledWith(Mock.step);
    });

  });

  describe('onPreAhead method', function() {

    it('should pipe the step on PreAheadActionService', function() {
      spyOn(Mock.PreAheadActionService, 'pipe');

      service.onPreAhead(Mock.step);

      expect(Mock.PreAheadActionService.pipe).toHaveBeenCalledWith(Mock.step);
    });

  });

  describe('onAhead method', function() {

    it('should pipe the step on ExecutionAheadActionService', function() {
      spyOn(Mock.ExecutionAheadActionService, 'pipe');

      service.onAhead(Mock.step);

      expect(Mock.ExecutionAheadActionService.pipe).toHaveBeenCalledWith(Mock.step);
    });

  });

  describe('onPostAhead method', function() {

    it('should pipe the step on PostAheadActionService', function() {
      spyOn(Mock.PostAheadActionService, 'pipe');

      service.onPostAhead(Mock.step);

      expect(Mock.PostAheadActionService.pipe).toHaveBeenCalledWith(Mock.step);
    });

  });

  function mockPlayerStartActionService($injector) {
    Mock.PlayerStartActionService = $injector.get('otusjs.player.core.phase.PlayerStartActionService');
    Injections.PlayerStartActionService = Mock.PlayerStartActionService;
  }

  function mockPrePlayerStartActionService($injector) {
    Mock.PrePlayerStartActionService = $injector.get('otusjs.player.core.phase.PrePlayerStartActionService');
    Injections.PrePlayerStartActionService = Mock.PrePlayerStartActionService;
  }

  function mockExecutionPlayerStartActionService($injector) {
    Mock.ExecutionPlayerStartActionService = $injector.get('otusjs.player.core.phase.ExecutionPlayerStartActionService');
    Injections.ExecutionPlayerStartActionService = Mock.ExecutionPlayerStartActionService;
  }

  function mockPostPlayerStartActionService($injector) {
    Mock.PostPlayerStartActionService = $injector.get('otusjs.player.core.phase.PostPlayerStartActionService');
    Injections.PostPlayerStartActionService = Mock.PostPlayerStartActionService;
  }

  function mockPlayActionService($injector) {
    Mock.PlayActionService = $injector.get('otusjs.player.core.phase.PlayActionService');
    Injections.PlayActionService = Mock.PlayActionService;
  }

  function mockPrePlayActionService($injector) {
    Mock.PrePlayActionService = $injector.get('otusjs.player.core.phase.PrePlayActionService');
    Injections.PrePlayActionService = Mock.PrePlayActionService;
  }

  function mockExecutionPlayActionService($injector) {
    Mock.ExecutionPlayActionService = $injector.get('otusjs.player.core.phase.ExecutionPlayActionService');
    Injections.ExecutionPlayActionService = Mock.ExecutionPlayActionService;
  }

  function mockPostPlayActionService($injector) {
    Mock.PostPlayActionService = $injector.get('otusjs.player.core.phase.PostPlayActionService');
    Injections.PostPlayActionService = Mock.PostPlayActionService;
  }

  function mockAheadActionService($injector) {
    Mock.AheadActionService = $injector.get('otusjs.player.core.phase.AheadActionService');
    Injections.AheadActionService = Mock.AheadActionService;
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

  function mockChain($injector) {
    let factory = $injector.get('otusjs.player.core.scaffold.ChainFactory');
    Mock.chain = factory.create();
    Injections.ChainFactory = factory;
    spyOn(Injections.ChainFactory, 'create').and.returnValue(Mock.chain);
  }

  function mockChainLink($injector) {
    Mock.ChainLinkFactory = $injector.get('otusjs.player.core.scaffold.ChainLinkFactory');
    Mock.step = $injector.get('otusjs.player.core.scaffold.ChainLinkFactory').create();
    spyOn(Mock.ChainLinkFactory, 'create').and.returnValue(Mock.step);
    Injections.ChainLinkFactory = Mock.ChainLinkFactory;
  }
});
