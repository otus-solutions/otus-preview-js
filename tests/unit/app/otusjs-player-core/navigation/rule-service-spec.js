xdescribe('RuleService', function() {

  let Mock = {};
  let Injections = {};
  let service = {};

  beforeEach(function() {
    module('otusjs.player.core');

    inject(function(_$injector_) {
      mockRule(_$injector_);
      mockActivityFacadeService(_$injector_);
      service = _$injector_.get('otusjs.player.core.navigation.RuleService', Injections);
    });
  });

  describe('isRuleApplicable method', function() {

    describe('for all cases', function() {

      it('should retrieve the item that corresponds to "when item" of rule', function() {
        service.isRuleApplicable(Mock.rule);

        expect(Mock.ActivityFacadeService.fetchItemByID).toHaveBeenCalledWith(Mock.rule.when);
      });

      it('should retrieve the "when item" answer', function() {
        service.isRuleApplicable(Mock.rule);

        expect(Mock.ActivityFacadeService.fetchItemByID).toHaveBeenCalledWith(Mock.rule.when);
      });

    });

    describe('when rule is applicable', function() {

      it('should return true', function() {
        service.isRuleApplicable(Mock.rule);
      });

    });

  });

  function mockRule($injector) {
    Mock.rule = {};
    Mock.rule.when = 'CAD1';
    Mock.rule.operator = 'equal';
    Mock.rule.answer = 'a value';
  }

  function mockActivityFacadeService($injector) {
    Mock.ActivityFacadeService = $injector.get('otusjs.player.core.activity.ActivityFacadeService');
    spyOn(Mock.ActivityFacadeService, 'fetchItemByID').and.returnValue();
    Injections.ActivityFacadeService = Mock.ActivityFacadeService;
  }

  function mockWhenItem() {
    Mock.rule = {};
  }

});
