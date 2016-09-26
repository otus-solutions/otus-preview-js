describe('PreGoAheadStage', function() {

  let Mock = {};
  let Injections = {};
  let chain = {};

  beforeEach(function() {
    module('otusjs.player.core');

    inject(function(_$injector_) {
      mockChainLink(_$injector_);
      let factory = _$injector_.get('otusjs.player.core.player.ChainFactory', Injections);
      chain = factory.create();
    });
  });

  describe('chain method', function() {

    beforeEach(function() {
      chain.chain(Mock.linkA);
      chain.chain(Mock.linkB);
      chain.chain(Mock.linkC);
      chain.chain(Mock.linkD);
      chain.chain(Mock.linkE);
    });

    it('should add a link at end of link chain', function() {
      let link = chain.getChainHead();
      expect(link).not.toEqual(Mock.linkA);

      link = link.getNext();
      expect(link).toEqual(Mock.linkA);

      link = link.getNext();
      expect(link).toEqual(Mock.linkB);

      link = link.getNext();
      expect(link).toEqual(Mock.linkC);

      link = link.getNext();
      expect(link).toEqual(Mock.linkD);

      link = link.getNext();
      expect(link).toEqual(Mock.linkE);

      expect(chain.getChainTail()).toEqual(Mock.linkE);
    });

    it('the last link should point to null', function() {
      expect(Mock.linkE.getNext()).toBe(null);
    });

  });

  describe('execute method', function() {

    beforeEach(function() {
      chain.chain(Mock.linkA);
      chain.chain(Mock.linkB);
      chain.chain(Mock.linkC);
      chain.chain(Mock.linkD);
      chain.chain(Mock.linkE);
    });

    it('should call execute method from all links on the chain', function() {
      chain.execute({isFlowing: true});

      expect(Mock.linkA.execute).toHaveBeenCalled();
      expect(Mock.linkB.execute).toHaveBeenCalled();
      expect(Mock.linkC.execute).toHaveBeenCalled();
      expect(Mock.linkD.execute).toHaveBeenCalled();
      expect(Mock.linkE.execute).toHaveBeenCalled();
    });

  });

  function mockChainLink($injector) {
    let factory = $injector.get('otusjs.player.core.player.ChainLinkFactory');

    Mock.linkA = factory.create();
    spyOn(Mock.linkA, 'execute').and.callThrough();

    Mock.linkB = factory.create();
    spyOn(Mock.linkB, 'execute').and.callThrough();

    Mock.linkC = factory.create();
    spyOn(Mock.linkC, 'execute').and.callThrough();

    Mock.linkD = factory.create();
    spyOn(Mock.linkD, 'execute').and.callThrough();

    Mock.linkE = factory.create();
    spyOn(Mock.linkE, 'execute').and.callThrough();
  }

});
