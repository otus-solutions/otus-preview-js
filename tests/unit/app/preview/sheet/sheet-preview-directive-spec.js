xdescribe('otusSheetPreview', function() {

  var $route, $rootScope, $location, $httpBackend;

  beforeEach(inject(function($injector) {
    module('otus.preview');

    //$route = $injector.get('$route');
    $rootScope = $injector.get('$rootScope');
    $location = $injector.get('$location');
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.when('GET', '/app/ui-preview/sheet/sheet-preview-container.html').respond('sheet');
  }));

  describe('test of directive otusSheetPreview', function() {

    it('element must be well defined', function() {
      var element = $compile("<otus-sheet-preview></otus-sheet-preview>")($rootScope);
      expect(element).toBeDefined();
    });

    it('should go to the sheet-preview-containe state', function() {
      $rootScope.$apply(function() {
        $location.path('/sheet');
      });
      expect($location.path()).toBe('/sheet');
      expect($route.current.templateUrl).toBe('node_modules/otus-preview-js/app/preview/sheet/sheet-preview-container.html');
    });

  });

});
