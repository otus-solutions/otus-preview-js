describe('surveyViewerModelFactory_TestSuite', function () {
  var factory;
  var Injections = [];
  var Mock = {};

  beforeEach(function () {
    angular.mock.module('otusjs.player.standalone');
    angular.mock.inject(function ($injector) {
      Injections.ActivityFacadeService = $injector.get('otusjs.model.activity.ActivityFacadeService');
      Mock.activityFactory = $injector.get('otusjs.model.activity.ActivityFactory');
      Mock.activity = Mock.activityFactory.fromJsonObject(Test.utils.data.activity);
      Mock.activity.surveyForm.acronym = Mock.activity.surveyForm.surveyTemplate.identity.acronym;
      Mock.activity.surveyForm.name = Mock.activity.surveyForm.surveyTemplate.identity.name;
      Injections.ActivityFacadeService.surveyActivity = Mock.activity;

      factory = $injector.get('otusjs.player.data.viewer.SurveyViewFactory', Injections);
    });
  });


  it('factoryExistence check ', function () {
    expect(factory).toBeDefined();
  });

  it('factoryMethodsExistence check', function () {
    expect(factory.create).toBeDefined();
  });

  it('method_should', function () {
    Mock.activityView = factory.create();

    console.log(Mock.activityView)


  });
});
