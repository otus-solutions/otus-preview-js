describe('HtmlBuilderService', function() {
    var camelCaseString = 'CamelCaseString';
    var tagNameString = 'camel-case-string';
    var service;

    beforeEach(function() {
        module('otus.preview');

        inject(function(_$injector_) {
            service = _$injector_.get('HtmlBuilderService');
        });
    });

    describe('generateTagName method', function() {

        it('should replace camel case with hyphen and lower case', function() {
            expect(service.generateTagName(camelCaseString)).toEqual(tagNameString);
        });

        it('should keep the string if it is not camel case', function() {
            expect(service.generateTagName(camelCaseString.toLowerCase())).toEqual(camelCaseString.toLowerCase());
        });
    });

});
