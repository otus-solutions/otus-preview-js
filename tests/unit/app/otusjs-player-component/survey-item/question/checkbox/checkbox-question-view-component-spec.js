describe('checkbox question view controller component', function () {
  var Mock = {};
  var controller;

  beforeEach(function () {
    angular.mock.module('otusjs.player.component');

    inject(function (_$controller_) {
      mockController(_$controller_);
    });

    mockBindings();
  });


  describe('the initialization', function () {
    it('should have a defined controller', function () {
      expect(controller).toBeDefined();
    });

    it('should build an new component with values', function () {
      controller.$onInit();
      expect(controller.answerArray).toEqual(1);
      expect(controller.view).toEqual(true);
    });


  });

  //mock functions
  function mockController(_$controller_) {

    controller = _$controller_('otusCheckboxQuestionViewCtrl');
  }

  function mockBindings() {
    Mock.itemData = {
      data: {
        answer:{
          value: 1
        }
      },
      options: [
        {
          'extents': 'StudioObject',
          'objectType': 'CheckboxAnswerOption',
          'optionID': 'ACB2a',
          'customOptionID': 'ACB2a',
          'dataType': 'Boolean',
          'label': {
            'ptBR': {
              'extends': 'StudioObject',
              'objectType': 'Label',
              'oid': '',
              'plainText': 'primeira',
              'formattedText': 'primeira'
            },
            'enUS': {
              'extends': 'StudioObject',
              'objectType': 'Label',
              'oid': '',
              'plainText': '',
              'formattedText': ''
            },
            'esES': {
              'extends': 'StudioObject',
              'objectType': 'Label',
              'oid': '',
              'plainText': '',
              'formattedText': ''
            }
          }
        },
        {
          'extents': 'StudioObject',
          'objectType': 'CheckboxAnswerOption',
          'optionID': 'ACB2b',
          'customOptionID': 'ACB2b',
          'dataType': 'Boolean',
          'label': {
            'ptBR': {
              'extends': 'StudioObject',
              'objectType': 'Label',
              'oid': '',
              'plainText': 'segunda',
              'formattedText': 'segunda'
            },
            'enUS': {
              'extends': 'StudioObject',
              'objectType': 'Label',
              'oid': '',
              'plainText': '',
              'formattedText': ''
            },
            'esES': {
              'extends': 'StudioObject',
              'objectType': 'Label',
              'oid': '',
              'plainText': '',
              'formattedText': ''
            }
          }
        }
      ]
    };

    controller.itemData = Mock.itemData;
  }


});
