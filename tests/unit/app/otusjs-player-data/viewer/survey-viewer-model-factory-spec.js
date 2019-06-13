describe('surveyViewerModelFactory_TestSuite', function () {
  var factory, activity;
  var Injections = [];
  var Mock = {};

  beforeEach(function () {
    angular.mock.module('otusjs.player.standalone');
    angular.mock.inject(function ($injector) {
      Injections.ActivityFacadeService = $injector.get('otusjs.model.activity.ActivityFacadeService');
      Mock.activityFactory = $injector.get('otusjs.model.activity.ActivityFactory');
      factory = $injector.get('otusjs.player.data.viewer.SurveyViewFactory', Injections);
    });
  });

  beforeEach(function () {
    activity = Mock.activityFactory.fromJsonObject(Test.utils.data.activityPASC);
    Injections.ActivityFacadeService.surveyActivity = activity;

  });

  it('factoryExistence check ', function () {
    expect(factory).toBeDefined();
  });

  it('factoryMethodsExistence check', function () {
    expect(factory.create).toBeDefined();
    console.log(activity);
  });

  it('method_should', function () {
    factory.create();
  });
});
