describe('TagComponentBuilderService', function() {
    var service;
    var expectedTagElement = '<calendar-question item-data="$ctrl.itemData" />';
    var elementType = "CalendarQuestion";
    var Mock = {};

    beforeEach(function() {
        module('otus.preview.component');

        inject(function(_$injector_) {
            service = _$injector_.get('TagComponentBuilderService', {
                HtmlBuilderService: mockHtmlBuilderService(_$injector_)
            });
        });
    });

    describe('createTagElement method', function() {

        it('should return a valid HTML tag', function () {
            expect(service.createTagElement(elementType)).toBe(expectedTagElement);
        });

    });

    function mockHtmlBuilderService($injector) {
        Mock.HtmlBuilderService = $injector.get('HtmlBuilderService');
        return Mock.HtmlBuilderService;
    }

});
