describe('PostAheadActionService', function() {

  let Mock = {};
  let Injections = {};
  let service = {};

  beforeEach(function() {
    module('otusjs.player.core');

    inject(function(_$injector_) {
      mockStep();
      mockChain(_$injector_);
      mockChainLink(_$injector_);
      service = _$injector_.get('otusjs.player.core.phase.PostAheadActionService', Injections);
    });
  });

  describe('pipe method', function() {

    it('should create a link to step', function() {
      service.pipe(Mock.step);

      expect(Mock.ChainLinkFactory.create).toHaveBeenCalledWith();
    });

    it('should setup the flow data catch procedure', function() {
      spyOn(Mock.stepLink, 'catchFlowData');

      service.pipe(Mock.step);

      expect(Mock.stepLink.catchFlowData).toHaveBeenCalledWith(Mock.step.catchPreData);
    });

    it('should setup the pre execution procedure', function() {
      spyOn(Mock.stepLink, 'setPreExecute');

      service.pipe(Mock.step);

      expect(Mock.stepLink.setPreExecute).toHaveBeenCalledWith(Mock.step.beforeEffect);
    });

    it('should setup the execution procedure', function() {
      spyOn(Mock.stepLink, 'setExecute');

      service.pipe(Mock.step);

      expect(Mock.stepLink.setExecute).toHaveBeenCalledWith(Mock.step.effect);
    });

    it('should setup the post execution procedure', function() {
      spyOn(Mock.stepLink, 'setPostExecute');

      service.pipe(Mock.step);

      expect(Mock.stepLink.setPostExecute).toHaveBeenCalledWith(Mock.step.afterEffect);
    });

    it('should setup the result resolve procedure', function() {
      spyOn(Mock.stepLink, 'setResult');

      service.pipe(Mock.step);

      expect(Mock.stepLink.setResult).toHaveBeenCalledWith(Mock.step.getEffectResult);
    });

    xit('should link the step in the chain', function() {
      service.pipe(Mock.step);

      expect(Mock.stepChain.chain).toHaveBeenCalledWith(Mock.stepLink);
    });

  });

  describe('execute method', function() {

    xit('should call execute from step chain', function() {
      spyOn(Mock.stepChain, 'execute');

      service.execute();

      expect(Mock.stepChain.execute).toHaveBeenCalledWith();
    });

  });

  function mockStep() {
    Mock.step = {};
    Mock.step.catchPreData = function() {};
    Mock.step.beforeEffect = function() {};
    Mock.step.effect = function() {};
    Mock.step.afterEffect = function() {};
    Mock.step.getEffectResult = function() {};
  }

  function mockChain($injector) {
    Mock.ChainFactory = $injector.get('otusjs.player.core.scaffold.ChainFactory');
    Mock.stepChain = Mock.ChainFactory.create();

    spyOn(Mock.ChainFactory, 'create').and.returnValue(Mock.stepChain);
    spyOn(Mock.stepChain, 'chain');

    Injections.ChainFactory = Mock.stepChainFactory;
  }

  function mockChainLink($injector) {
    Mock.ChainLinkFactory = $injector.get('otusjs.player.core.scaffold.ChainLinkFactory');
    Mock.stepLink = $injector.get('otusjs.player.core.scaffold.ChainLinkFactory').create();

    spyOn(Mock.ChainLinkFactory, 'create').and.returnValue(Mock.stepLink);

    Injections.ChainLinkFactory = Mock.ChainLinkFactory;
  }
});
