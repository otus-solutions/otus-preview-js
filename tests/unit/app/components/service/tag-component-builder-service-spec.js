describe('TagComponentBuilderService', function() {
    var service;
    var expectedTagElement = '<otus-calendar-question item-data="$ctrl.itemData" on-update="$ctrl.update(\'answer\', value)" />';
    var elementType = "CalendarQuestion";
    var Mock = {};

    beforeEach(function() {
        module('otus.component.preview');

        inject(function(_$injector_) {
            service = _$injector_.get('TagComponentBuilderService', {
                HtmlBuilderService: mockHtmlBuilderService(_$injector_)
            });
        });
    });

    describe('createTagElement method', function() {

        xit('hould return a valid HTML tag', function () {
            expect(service.createTagElement(elementType)).toBe(expectedTagElement);
        });

    });

    function mockHtmlBuilderService($injector) {
        Mock.HtmlBuilderService = $injector.get('HtmlBuilderService');
        return Mock.HtmlBuilderService;
    }

});
