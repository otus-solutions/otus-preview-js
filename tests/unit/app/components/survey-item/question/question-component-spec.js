describe('otusQuestion component', function() {

    var $ctrl;
    var Mock = {};

    describe('$onInit()', function() {
        beforeEach(function() {
            mockQuestion();
            $ctrl = _getComponentController();
        });

        it('should call the method TagComponentBuilderService.createTagElement', function() {
            spyOn(Mock.TagComponentBuilderService, 'createTagElement');
            $ctrl.$onInit();
            expect(Mock.TagComponentBuilderService.createTagElement).toHaveBeenCalledWith(Mock.question.objectType);
        });

    });

    function _getComponentController() {
        var $ctrl;
        module('otus.preview.component');
        inject(function($rootScope, $componentController, _$injector_) {
            mockTagComponentBuilderService(_$injector_);
            scope = $rootScope.$new();
            $ctrl = $componentController('otusQuestion', {
                $scope: scope
            }, {
                itemData: {
                    objectType: 'IntegerQuestion'
                }
            });
        });
        return $ctrl;
    }

    function mockTagComponentBuilderService($injector) {
        Mock.TagComponentBuilderService = $injector.get('TagComponentBuilderService');
    }

    function mockQuestion() {
        Mock.question = {
            objectType: 'IntegerQuestion'
        };
    }

});
