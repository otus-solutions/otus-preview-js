describe('Otus Preview component', function() {
    var component,
        compiledComponent,
        scope,
        SelectedSurveyTemplatesManagementService,
        $componentController,
        $compile;

    beforeEach(inject(function(_$componentController_, _$injector_) {
        $rootScope = _$injector_.get('$rootScope');
        $compile = _$injector_.get('$compile');
        $httpBackend = _$injector_.get('$httpBackend');
        scope = $rootScope.$new();
        component = angular.element('<otus-preview></otus-preview>');
        compiledComponent = $compile(component)(scope);
        scope.$digest();

    }));


    describe('$onInit()', function() {
        it('should load the survey template', function() {
        //    var $ctrl = _getComponentController();
            // spyOn($ctrl, 'loadVillains');
        //    $ctrl.$onInit();
            // expect($ctrl.loadVillains).toHaveBeenCalled();
            // console.log($ctrl.itemContainer);
        });
    });

    function _getComponentController() {
        var $ctrl;
        module('otus.preview.component');
        inject(function($componentController) {
            $ctrl = $componentController('otusPreview');
        });
        return $ctrl;
    }



});
