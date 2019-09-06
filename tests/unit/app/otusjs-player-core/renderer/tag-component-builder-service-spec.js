describe('otusjs.player.core.renderer.TagComponentBuilderService', function() {
  var service;
  var expectedTagElement = '<otus-calendar-question item-data="$ctrl.itemData" on-update="$ctrl.update(valueType, value)" />';
  var expectedTagElementView = '<otus-calendar-question-view item-data="$ctrl.itemData" />';
  var elementType = "CalendarQuestion";
  var Mock = {};

  beforeEach(function() {

    angular.mock.module('otusjs.player');

    angular.mock.inject(function(_$injector_) {
      mockHtmlBuilderService(_$injector_);
      Mock.Injections = {
        HtmlBuilderService: Mock.HtmlBuilderService
      }

      service = _$injector_.get('otusjs.player.core.renderer.TagComponentBuilderService', Mock.Injections);
    });
  });

  describe('createTagElement method', function() {
    beforeEach(function () {
      spyOn(Mock.Injections.HtmlBuilderService, "generateTagName").and.callThrough();
      service.createTagElement(elementType);
    });

    it('should called method generateTagName', function () {
      expect(Mock.Injections.HtmlBuilderService.generateTagName).toHaveBeenCalledWith(elementType);
    });

    it('hould return a valid HTML tag', function() {
      expect(service.createTagElement(elementType)).toEqual(expectedTagElement);
    });

  });
  describe('createTagElement method onlyView', function() {
    beforeEach(function () {
      spyOn(Mock.Injections.HtmlBuilderService, "generateTagName").and.callThrough();
      service.createTagElement(elementType, true);
    });

    it('should called method generateTagName', function () {
      expect(Mock.Injections.HtmlBuilderService.generateTagName).toHaveBeenCalledWith(elementType);
    });

    it('hould return a valid HTML tag', function() {
      expect(service.createTagElement(elementType, true)).toEqual(expectedTagElementView);
    });

  });

  function mockHtmlBuilderService(_$injector_) {
    Mock.HtmlBuilderService = _$injector_.get('otusjs.player.core.renderer.HtmlBuilderService');
  }

});
