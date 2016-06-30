describe('otusQuestion component', function() {

    describe('$onInit()', function() {
        it('should load the survey template', function() {
            var $ctrl = _getComponentController();
            $ctrl.$onInit();
        });
    });

    function _getComponentController() {
        var $ctrl;
        module('otus.preview.component');
        inject(function($componentController) {
            $ctrl = $componentController('otusQuestion');
        });
        return $ctrl;
    }

});
