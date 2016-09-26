describe('ChainLinkFactory', function() {

  let Mock = {};
  let chainLink = {};

  beforeEach(function() {
    module('otusjs.player.core');

    inject(function(_$injector_) {
      mockChainFactory();
      mockLinkClient();
      mockChainLink(_$injector_);
      let factory = _$injector_.get('otusjs.player.core.player.ChainLinkFactory');
      chainLink = factory.create();
    });

  });

  describe('every ChaiLinkService', function() {

    it('should have a next method defined', function() {
      expect(chainLink.setNext).toBeDefined();
    });

    it('should have a execute method defined', function() {
      expect(chainLink.execute).toBeDefined();
    });

  });

  describe('setNext method', function() {

    it('should keeps a reference to the next chain link', function() {
      chainLink.setNext(Mock.nextLink);

      expect(chainLink.getNext()).toEqual(Mock.nextLink);
    });

  });

  describe('setPreExecute method', function() {

    it('should keeps a reference to a client method', function() {
      chainLink.setPreExecute(Mock.linkClient.preExecute);
      chainLink.execute(Mock.chain);

      expect(Mock.linkClient.preExecute).toHaveBeenCalled();
      expect(Mock.injectA.method).toHaveBeenCalled();
    });

  });

  describe('setExecute method', function() {

    it('should keeps a reference to a client method', function() {
      chainLink.setExecute(Mock.linkClient.execute);
      chainLink.execute(Mock.chain);

      expect(Mock.linkClient.execute).toHaveBeenCalled();
      expect(Mock.injectB.method).toHaveBeenCalled();
    });

  });

  describe('setPostExecute method', function() {

    it('should keeps a reference to a client method', function() {
      chainLink.setPostExecute(Mock.linkClient.postExecute);
      chainLink.execute(Mock.chain);

      expect(Mock.linkClient.postExecute).toHaveBeenCalled();
      expect(Mock.injectC.method).toHaveBeenCalled();
    });

  });

  function mockChainFactory() {
    Mock.chain = {};
    Mock.chain.isFlowing = true;
  }

  function mockChainLink($injector) {
    Mock.nextLink = $injector.get('otusjs.player.core.player.ChainLinkFactory');
  };

  function mockLinkClient($injector) {
    Mock.injectA = {};
    Mock.injectA.method = jasmine.createSpy('method');

    Mock.injectB = {};
    Mock.injectB.method = jasmine.createSpy('method');

    Mock.injectC = {};
    Mock.injectC.method = jasmine.createSpy('method');

    Mock.linkClient = {};
    Mock.linkClient.preExecute = jasmine.createSpy('preExecute').and.callFake(function() {
      Mock.injectA.method();
    });
    Mock.linkClient.execute = jasmine.createSpy('execute').and.callFake(function() {
      Mock.injectB.method();
    });
    Mock.linkClient.postExecute = jasmine.createSpy('postExecute').and.callFake(function() {
      Mock.injectC.method();
    });
  }

});
