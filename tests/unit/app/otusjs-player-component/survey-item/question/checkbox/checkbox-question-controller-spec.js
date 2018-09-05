describe('checkbox question controller component', function () {
  var Mock = {};
  var controller;

  beforeEach(function () {
    mockCurrentItemService();

    angular.mock.module('otusjs.player.component', function ($provide) {
      $provide.value('otusjs.player.data.activity.CurrentItemService', Mock.CurrentItemService);
    });


    var injections = [
      Mock.CurrentItemService
    ];


    inject(function (_$controller_) {
      mockController(_$controller_, injections);
    });

    mockBindings();
  });


  describe('the initialization', function () {
    it('should have a defined controller', function () {
      expect(controller).toBeDefined();
    });

    it('should build an new option array using the itemData when CurrentItemService provides a null answer', function () {
      spyOn(Mock.CurrentItemService, 'getFilling').and.returnValue(Mock.nullAnswer);
      controller.$onInit();

      expect(controller.answerArray.length).toEqual(controller.itemData.options.length);

      controller.answerArray.forEach(function (answer, index) {
        expect(answer.option).toEqual(controller.itemData.options[index].customOptionID);
      });
    });

    it('should build an not empty array when CurrentItemService provides a not empty array as answer', function () {
      spyOn(Mock.CurrentItemService, 'getFilling').and.returnValue(Mock.arrayAnswer);
      controller.$onInit();

      expect(controller.answerArray).toEqual(Mock.arrayAnswer.answer.value);
      expect(controller.view).toEqual(false);

    });

  });

  describe('the clear function call', function () {
    beforeEach(function () {
      spyOn(controller, 'clear').and.callThrough();
      spyOn(Mock.CurrentItemService, 'getFilling').and.returnValue(Mock.arrayAnswer);
      // controller.answerArray = [];
      controller.clear();
    });

    it('should call clear function with success', function () {
      expect(controller.answerArray).not.toBeUndefined();
    });
  });



  describe('the update function and the parent onUpdate function call', function () {
    beforeEach(function () {
      spyOn(Mock.CurrentItemService, 'getFilling').and.returnValue(Mock.nullAnswer);
      spyOn(controller, 'onUpdate').and.callThrough();


      controller.$onInit();
    });

    it('should  call with self.answerArray if some option is true', function () {
      controller.answerArray = Mock.arrayAnswer.answer.value;
      controller.update();

      var answerObject = {
        valueType: 'answer',
        value: controller.answerArray
      };
      expect(controller.onUpdate).toHaveBeenCalledWith(answerObject);

    });

    it('should  call with null if any option is true', function () {
      controller.answerArray = Mock.arrayAnswer.answer.value;

      controller.answerArray.forEach(function (answer) {
        answer.state = false;
      });
      controller.update();

      var answerObject = {
        valueType: 'answer',
        value: null
      };
      expect(controller.onUpdate).toHaveBeenCalledWith(answerObject);

    });
  });


  //mock functions
  function mockController(_$controller_, injections) {
    controller = _$controller_('otusjs.player.component.CheckboxQuestionController', injections);
  }

  function mockCurrentItemService() {
    Mock.nullAnswer = {answer: {value: null}};
    Mock.arrayAnswer = {
      answer: {
        'value': [
          {
            'option': 'op1',
            'state': true
          },
          {
            'option': 'op2',
            'state': true
          },
          {
            'option': 'op3',
            'state': false
          },
          {
            'option': 'op4',
            'state': false
          }
        ],
        'objectType': 'AnswerFill',
        'type': 'CheckboxQuestion',
        clear: function () {}
      }
    };

    Mock.CurrentItemService = {
      getFilling: function () {
        return Mock.answerArray;
      }
    };
  }

  function mockBindings() {
    Mock.parentContainer = {
      onUpdate: function () {}
    };

    var otusQuestion = {
      answer: {}
    };

    var itemData = {
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

    controller.otusQuestion = otusQuestion;
    controller.itemData = itemData;
    controller.onUpdate = Mock.parentContainer.onUpdate;
  }


});
