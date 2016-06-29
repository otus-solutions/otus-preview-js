describe('surveyItem component', function() {

    describe('$onInit()', function() {
        it('should load the survey template', function() {
            var $ctrl = _getComponentController();
        });
    });

    function _getComponentController() {
        var $ctrl;
        module('otus.preview.component');
        inject(function($componentController) {
            $ctrl = $componentController('surveyItem');
        });
        return $ctrl;
    }

});
