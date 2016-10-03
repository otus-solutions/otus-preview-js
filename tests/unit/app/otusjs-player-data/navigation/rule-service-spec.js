xdescribe('RuleService', () => {

  let Mock = {};
  let Injections = {};
  let service = {};

  beforeEach(() => {
    module('otusjs.player.data');

    inject(function(_$injector_) {
      mockCorrectItemAnswer();
      mockRule(_$injector_);
      mockActivityFacadeService(_$injector_);
      mockRuleTestService(_$injector_);
      service = _$injector_.get('otusjs.player.data.navigation.RuleService', Injections);
    });
  });

  describe('isRuleApplicable method', () => {

    describe('for all cases', () => {

      beforeEach(() => {
        mockCorrectItemAnswer();
        spyOn(Mock.ActivityFacadeService, 'fetchItemAnswerByCustomID').and.returnValue(Mock.itemAnswer);
      });

      it('should retrieve the item that corresponds to "when item" of rule', () => {
        service.isRuleApplicable(Mock.rule);

        expect(Mock.ActivityFacadeService.fetchItemByID).toHaveBeenCalledWith(Mock.rule.when);
      });

      it('should retrieve the "when item" answer', () => {
        service.isRuleApplicable(Mock.rule);

        expect(Mock.ActivityFacadeService.fetchItemAnswerByCustomID).toHaveBeenCalledWith(Mock.rule.when);
      });

      it('should test the answer with RuleTestService', () => {
        service.isRuleApplicable(Mock.rule);

        expect(Mock.RuleTestService.run).toHaveBeenCalledWith(Mock.rule, Mock.itemAnswer.answer.value);
      });

    });

    describe('when rule is applicable', () => {

      beforeEach(() => {
        mockCorrectItemAnswer();
        spyOn(Mock.ActivityFacadeService, 'fetchItemAnswerByCustomID').and.returnValue(Mock.itemAnswer);
      });

      it('should return true', () => {
        expect(service.isRuleApplicable(Mock.rule)).toBe(true);
      });

    });

    describe('when rule is not applicable', () => {

      beforeEach(() => {
        mockIncorrectItemAnswer();
        spyOn(Mock.ActivityFacadeService, 'fetchItemAnswerByCustomID').and.returnValue(Mock.itemAnswer);
      });

      it('should return false', () => {
        expect(service.isRuleApplicable(Mock.rule)).toBe(false);
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
    Mock.ActivityFacadeService = $injector.get('otusjs.player.data.activity.ActivityFacadeService');
    spyOn(Mock.ActivityFacadeService, 'fetchItemByID');
    Injections.ActivityFacadeService = Mock.ActivityFacadeService;
  }

  function mockRuleTestService($injector) {
    Mock.RuleTestService = $injector.get('otusjs.player.data.navigation.RuleTestService');

    spyOn(Mock.RuleTestService, 'run').and.callThrough();

    Injections.RuleTestService = Mock.RuleTestService;
  }

  function mockWhenItem() {
    Mock.rule = {};
  }

  function mockCorrectItemAnswer() {
    Mock.itemAnswer = {
      objectType: "QuestionFill",
      questionID: "CAD4",
      answer: {
        objectType: "AnswerFill",
        value: "a value"
      },
      metadata: {
        objectType: "MetadataFill"
      }
    };
  }

  function mockIncorrectItemAnswer() {
    Mock.itemAnswer = {
      objectType: "QuestionFill",
      questionID: "CAD4",
      answer: {
        objectType: "AnswerFill",
        value: "any value"
      },
      metadata: {
        objectType: "MetadataFill"
      }
    };
  }
});
