fdescribe('ChainLinkService', function() {

  var Mock = {};
  var Injections = {};
  var service = {};

  beforeEach(function() {
    module('otusjs.player.core');

    inject(function(_$injector_) {
      mockLinkClient();
      mockChainLink(_$injector_);
      service = _$injector_.get('otusjs.player.core.player.ChainLinkService', Injections);
    });

  });

  describe('every ChaiLinkService', function() {

    it('should have a next method defined', function() {
      expect(service.setNext).toBeDefined();
    });

    it('should have a run method defined', function() {
      expect(service.run).toBeDefined();
    });

  });

  describe('setNext method', function() {

    it('should keeps a reference to the next chain link', function() {
      service.setNext(Mock.nextLink);

      expect(service.getNext()).toEqual(Mock.nextLink);
    });

  });

  fdescribe('setPreProcedure method', function() {

    it('should keeps a reference to a client method', function() {
      service.setPreProcedure(Mock.linkClient.preMethod);
      service.run();
    });

  });


  function mockChainLink($injector) {
    Mock.nextLink = $injector.get('otusjs.player.core.player.ChainLinkService');
  };

  function mockLinkClient($injector) {
    var injectA = {
      methodA: function() {
        return 'I am the methodA.';
      }
    }
    var injectB = {
      methodB: function() {
        return 'I am the methodB.';
      }
    }
    var injectC = {
      methodC: function() {
        return 'I am the methodC.';
      }
    }

    function Client(injectionA, injectionB, injectionC) {
      var self = this;

      self.preMethod = function() {
        console.log(self);
        return injectionA.methodA();
      }
      self.method = function() {
        console.log(self);
        return injectionB.methodB();
      }
      self.posMethod = function() {
        console.log(self);
        return injectionC.methodC();
      }
    }

    Mock.linkClient = new Client(injectA, injectB, injectC);
  }

});
