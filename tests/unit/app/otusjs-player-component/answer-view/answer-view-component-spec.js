describe('answer view component', function () {
  var Mock = {};
  var controller;
  var injections = {};

  beforeEach(function () {
    Mock.mountedTag ='<otus-autocomplete-question-view item-data="$ctrl.itemData" />';
    Mock.icon = 'youtube_searched_for';
    Mock.answer = "Resposta: Medicamentos";
    Mock.comment = "Comentário: comment";
    Mock.metadata = ["Não quer responder","Não sabe","Não se aplica","Não há dados"];
    var date = new Date();
    Mock.dateString = date.toISOString();


    angular.mock.module('otusjs.player');

    inject(function(_$controller_,_$injector_) {
      Mock.TagComponentBuilderService = _$injector_.get("otusjs.player.core.renderer.TagComponentBuilderService");
      Mock.PlayerService = _$injector_.get("otusjs.player.core.player.PlayerService");
      Mock.filter = _$injector_.get("$filter");

      injections = {
        'otusjs.player.core.player.PlayerService': Mock.PlayerService,
        'otusjs.player.core.renderer.TagComponentBuilderService': Mock.TagComponentBuilderService,
        '$filter': Mock.filter
      };

      controller = _$controller_('answerViewCtrl', injections);
      mockBindings();
    });
  });


  describe('the initialization', function () {
    it('should have a defined controller', function () {
      expect(controller).toBeDefined();
    });


    it('should fill the component fields', function () {
      controller.$onInit();
      expect(controller.hueClass).toEqual('md-accent md-hue-1');
      expect(controller.itemData).toEqual(Mock.itemData);
      expect(controller.template).toEqual(Mock.mountedTag);
      expect(controller.icon).toEqual(Mock.icon);
      expect(controller.labelFormatted).toEqual(Mock.question);
      expect(controller.label).toEqual(Mock.question);
      expect(controller.answer).toEqual(Mock.answer);
      expect(controller.comment).toEqual(Mock.comment);
      expect(controller.METADADA).toEqual(Mock.metadata);
    });
  });

  describe('goingBack', function () {
    it('should call PlayerService.setGoBackTo', function () {
      spyOn(Mock.PlayerService,"setGoBackTo").and.callThrough();
      spyOn(controller,"goBack").and.callThrough();
      controller.goingBack('TST2');
      expect(Mock.PlayerService.setGoBackTo).toHaveBeenCalledWith(Mock.itemData.templateID);
      expect(controller.goBack).toHaveBeenCalled();
    });
  });

  describe('viewQuestion', function () {
    it('should change controller.view and controller.hueClass', function () {
      controller.$onInit();
      controller.viewQuestion();
      expect(controller.view).toEqual(true);
      expect(controller.hueClass).toEqual("md-primary md-hue-1");
      controller.viewQuestion();
      expect(controller.view).toEqual(false);
      expect(controller.hueClass).toEqual("md-accent md-hue-1");
    });
  });

  describe('formatDate', function () {
    it('should return Date', function () {
      controller.icon = "CalendarQuestion";
      controller.itemData.data.answer.value = Mock.dateString;
      controller.$onInit();
      var date = 'Resposta: '+Mock.filter('date')(new Date(Mock.dateString), 'dd/MM/yyyy');
      expect(controller.answer).toEqual(date);
    });
  });

  describe('formatTime', function () {
    it('should return Time', function () {
      controller.icon = "TimeQuestion";
      controller.itemData.data.answer.value = Mock.dateString;
      controller.$onInit();
      var time = 'Resposta: '+Mock.filter('date')(new Date(Mock.dateString), 'HH:mm');
      expect(controller.answer).toEqual(time);
    });
  });

  describe('formatSingleSelection', function () {
    it('should return Time', function () {
      controller.icon = "SingleSelectionQuestion";
      controller.itemData.options = [
        {
          "extents" : "StudioObject",
          "objectType" : "AnswerOption",
          "dataType" : "Integer",
          "label" : {
            "ptBR" : {
              "extends" : "StudioObject",
              "objectType" : "Label",
              "oid" : "",
              "plainText" : "Não",
              "formattedText" : "Não"
            },
            "enUS" : {
              "extends" : "StudioObject",
              "objectType" : "Label",
              "oid" : "",
              "plainText" : "",
              "formattedText" : ""
            },
            "esES" : {
              "extends" : "StudioObject",
              "objectType" : "Label",
              "oid" : "",
              "plainText" : "",
              "formattedText" : ""
            }
          },
          "value" : 1,
          "extractionValue" : "0"
        },
        {
          "extents" : "StudioObject",
          "objectType" : "AnswerOption",
          "dataType" : "Integer",
          "label" : {
            "ptBR" : {
              "extends" : "StudioObject",
              "objectType" : "Label",
              "oid" : "",
              "plainText" : "Sim",
              "formattedText" : "Sim"
            },
            "enUS" : {
              "extends" : "StudioObject",
              "objectType" : "Label",
              "oid" : "",
              "plainText" : "",
              "formattedText" : ""
            },
            "esES" : {
              "extends" : "StudioObject",
              "objectType" : "Label",
              "oid" : "",
              "plainText" : "",
              "formattedText" : ""
            }
          },
          "value" : 2,
          "extractionValue" : "1"
        }
      ];
      controller.itemData.data = {
        answer: {
          value: 1
        }
      };

      controller.$onInit();
      var response = 'Resposta: '+'Não';
      expect(controller.answer).toEqual(response);
    });
  });

  describe('formatFileUpload', function () {
    it('should file name', function () {
      controller.icon = "FileUploadQuestion";
      controller.objectType = "FileUploadQuestion";
      controller.itemData.data = {
        "answer": {
          "value": [
            {
              "objectType": "FileAnswer",
              "name": "ELSABOX.txt",
              "size": 30,
              "type": "text/plain",
              "sentDate": "2017-10-03T19:39:52.380Z",
              "oid": ""
            }
          ]
        }
      };
      controller.$onInit();
      var response = 'Resposta: '+'ELSABOX.txt; ';
      expect(controller.answer).toEqual(response);
    });
  });

  describe('isQuestion', function () {
    it('should return true', function () {
      controller.$onInit();
      expect(controller.isQuestion()).toEqual(true);
    });

    it('should return false with ImageItem', function () {
      controller.itemData.data = false;
      controller.itemData.objectType = "ImageItem";
      controller.$onInit();
      expect(controller.isQuestion()).toEqual(false);
    });

    it('should return false with TextItem', function () {
      controller.itemData.data = false;
      controller.itemData.value = {"ptBR": {"formattedText" :" TextItem"}};
      controller.itemData.objectType = "TextItem";
      controller.$onInit();
      expect(controller.isQuestion()).toEqual(false);
    });
  });

  describe('isItem', function () {
    it('should return false', function () {
      controller.$onInit();
      expect(controller.isItem()).toEqual(false);
    });

    it('should return true with ImageItem', function () {
      controller.itemData.data = false;
      controller.itemData.objectType = "ImageItem";
      controller.$onInit();
      expect(controller.isItem()).toEqual(true);
    });

    it('should return true with TextItem', function () {
      controller.itemData.data = false;
      controller.itemData.value = {"ptBR": {"formattedText" :" TextItem"}};
      controller.itemData.objectType = "TextItem";
      controller.$onInit();
      expect(controller.isItem()).toEqual(true);
    });
  });

  function mockBindings() {
    Mock.parentContainer = {
      goBack: function () {}
    };

    Mock.question = "LABEL";

    Mock.itemData = {
      'dataSources' : [
        'medicamentos'
      ],
      'data': {
        'answer': {
          'value': 'Medicamentos'
        },
        'comment':'comment'
      },
      'label' : {
        'ptBR' : {
          'extends' : 'StudioObject',
          'objectType' : 'Label',
          'oid' : '',
          'plainText' : 'ENTREVISTADOR',
          'formattedText' : '<div style=\'text-align: justify;\'><b>ENTREVISTADOR: </b></div>'
        }
      },
      'metadata' : {
        'extents' : 'StudioObject',
        'objectType' : 'MetadataGroup',
        'options' : [
          {
            'extends' : 'StudioObject',
            'objectType' : 'MetadataAnswer',
            'dataType' : 'Integer',
            'value' : 1,
            'extractionValue' : '.Q',
            'label' : {
              'ptBR' : {
                'extends' : 'StudioObject',
                'objectType' : 'Label',
                'oid' : '',
                'plainText' : 'Não quer responder',
                'formattedText' : '<div>Não quer responder</div>'
              }
            }
          },
          {
            'extends' : 'StudioObject',
            'objectType' : 'MetadataAnswer',
            'dataType' : 'Integer',
            'value' : 2,
            'extractionValue' : '.S',
            'label' : {
              'ptBR' : {
                'extends' : 'StudioObject',
                'objectType' : 'Label',
                'oid' : '',
                'plainText' : 'Não sabe',
                'formattedText' : 'Não sabe'
              },
              'enUS' : {
                'extends' : 'StudioObject',
                'objectType' : 'Label',
                'oid' : '',
                'plainText' : '',
                'formattedText' : ''
              },
              'esES' : {
                'extends' : 'StudioObject',
                'objectType' : 'Label',
                'oid' : '',
                'plainText' : '',
                'formattedText' : ''
              }
            }
          },
          {
            'extends' : 'StudioObject',
            'objectType' : 'MetadataAnswer',
            'dataType' : 'Integer',
            'value' : 3,
            'extractionValue' : '.A',
            'label' : {
              'ptBR' : {
                'extends' : 'StudioObject',
                'objectType' : 'Label',
                'oid' : '',
                'plainText' : 'Não se aplica',
                'formattedText' : 'Não se aplica'
              }
            }
          },
          {
            'extends' : 'StudioObject',
            'objectType' : 'MetadataAnswer',
            'dataType' : 'Integer',
            'value' : 4,
            'extractionValue' : '.F',
            'label' : {
              'ptBR' : {
                'extends' : 'StudioObject',
                'objectType' : 'Label',
                'oid' : '',
                'plainText' : 'Não há dados',
                'formattedText' : 'Não há dados'
              }
            }
          }
        ]
      },
      'fillingRules' : {
        'extends' : 'StudioObject',
        'objectType' : 'FillingRules',
        'options' : {
          'mandatory' : {
            'data' : {
              'reference' : true,
              'canBeIgnored' : false
            },
            'extends' : 'StudioObject',
            'objectType' : 'Rule',
            'validatorType' : 'mandatory'
          }
        }
      },
      'extents' : 'SurveyItem',
      'objectType' : 'AutocompleteQuestion',
      'templateID' : 'TST2',
      'customID' : 'TST2_1',
      'dataType' : 'String'
    };

    controller.question = Mock.question;
    controller.itemData = Mock.itemData;
    controller.goBack = Mock.parentContainer.goBack;
    controller.icon = Mock.itemData.objectType;
  }
  //

});