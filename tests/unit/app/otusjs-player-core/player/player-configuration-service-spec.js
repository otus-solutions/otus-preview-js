describe('PlayerConfigurationService', function() {

  var Mock = {};
  var Injections = {};
  var service = {};

  beforeEach(function() {
    module('otusjs.player.core');

    inject(function(_$injector_) {
      mockChainLink(_$injector_);

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

  function mockPlayActionService($injector) {
    Mock.PlayActionService = $injector.get('otusjs.player.core.player.PlayActionService');
    Injections.PlayActionService = Mock.PlayActionService;
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

  function mockAheadActionService($injector) {
    Mock.AheadActionService = $injector.get('otusjs.player.core.player.AheadActionService');
    Injections.AheadActionService = Mock.AheadActionService;
  }

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

  function mockChain($injector) {
    let factory = $injector.get('otusjs.player.core.player.ChainFactory');
    Mock.chain = factory.create();
    Injections.ChainFactory = factory;
    spyOn(Injections.ChainFactory, 'create').and.returnValue(Mock.chain);
  }

  function mockChainLink($injector) {
    Mock.ChainLinkFactory = $injector.get('otusjs.player.core.player.ChainLinkFactory');
    Mock.step = $injector.get('otusjs.player.core.player.ChainLinkFactory').create();
    spyOn(Mock.ChainLinkFactory, 'create').and.returnValue(Mock.step);
    Injections.ChainLinkFactory = Mock.ChainLinkFactory;
  }
});
