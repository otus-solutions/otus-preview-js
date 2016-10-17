describe('RuleService', () => {

  var UNIT_NAME = 'otusjs.player.data.navigation.RuleService';
  var Mock = {};
  var Injections = {};
  var service = {};

  beforeEach(() => {
    module('otusjs.player.data');

    inject(function(_$injector_) {
      /* Test data */
      mockCorrectItemAnswer();
      mockRule(_$injector_);

      /* Injectable mocks */
      mockActivityFacadeService(_$injector_);

      service = _$injector_.get(UNIT_NAME, Injections);
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

      it('should test the answer with answer evaluator', () => {
        service.isRuleApplicable(Mock.rule);

        expect(Mock.itemAnswer.answer.eval.run).toHaveBeenCalledWith(Mock.rule, Mock.itemAnswer.answer.value);
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

  function mockCorrectItemAnswer() {
    Mock.itemAnswer = {
      objectType: "QuestionFill",
      questionID: "CAD4",
      answer: {
        objectType: "AnswerFill",
        value: "a value",
        eval: {}
      },
      metadata: {
        objectType: "MetadataFill"
      }
    };

    Mock.itemAnswer.answer.eval.run = jasmine.createSpy('run').and.returnValue(true);
  }

  function mockIncorrectItemAnswer() {
    Mock.itemAnswer = {
      objectType: "QuestionFill",
      questionID: "CAD4",
      answer: {
        objectType: "AnswerFill",
        value: "any value",
        eval: {}
      },
      metadata: {
        objectType: "MetadataFill"
      }
    };

    Mock.itemAnswer.answer.eval.run = jasmine.createSpy('run').and.returnValue(false);
  }
});
