describe('PreAheadActionService', function() {

  let Mock = {};
  let Injections = {};
  let service = {};

  beforeEach(function() {
    module('otusjs.player.core');

    inject(function(_$injector_) {
      mockChainLink();
      mockChain(_$injector_);
      service = _$injector_.get('otusjs.player.core.player.PreAheadActionService', Injections);
    });
  });

  describe('pipe method', function() {

    it('should link the step to step chain', function() {
      spyOn(Mock.chain, 'chain');

      service.pipe(Mock.link);

      expect(Mock.chain.chain).toHaveBeenCalledWith(Mock.link);
    });

  });

  describe('execute method', function() {

    it('should call execute from step chain', function() {
      spyOn(Mock.chain, 'execute');

      service.execute();

      expect(Mock.chain.execute).toHaveBeenCalledWith();
    });

  });

  function mockChain($injector) {
    let factory = $injector.get('otusjs.player.core.player.ChainFactory');
    Mock.chain = factory.create();
    Injections.ChainFactory = factory;
    spyOn(Injections.ChainFactory, 'create').and.returnValue(Mock.chain);
  }

  function mockChainLink() {
    Mock.link = {};
  }

});
