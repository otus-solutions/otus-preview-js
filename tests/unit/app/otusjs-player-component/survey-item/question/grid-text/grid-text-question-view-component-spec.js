describe('grid text question view controller component', function () {
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
      expect(controller.answerArray).toEqual(Mock.itemData.data.answer.value);
      expect(controller.view).toEqual(true);
    });


  });

  //mock functions
  function mockController(_$controller_) {

    controller = _$controller_('otusGridTextQuestionViewCtrl');
  }

  function mockBindings() {
    Mock.itemData = {
      "data":{
        "answer":{
          "value": [
            [
              {"objectType":"GridIntegerAnswer","customID":"TST31a","value":"5"},
              {"objectType":"GridIntegerAnswer","customID":"TST31b","value":"5"},
              {"objectType":"GridIntegerAnswer","customID":"TST31c","value":"5"}
              ]
          ]
        }
      },
      "lines" : [
        {
          "extents" : "StudioObject",
          "objectType" : "GridIntegerLine",
          "gridIntegerList" : [
            {
              "layout" : {
                "extents" : "StudioObject",
                "objectType" : "LayoutGrid",
                "width" : "100"
              },
              "unit" : {
                "ptBR" : {
                  "extends" : "StudioObject",
                  "objectType" : "Unit",
                  "oid" : "",
                  "plainText" : "0 a 85 anos",
                  "formattedText" : "0 a 85 anos"
                }
              },
              "label" : {
                "ptBR" : {
                  "extends" : "StudioObject",
                  "objectType" : "Label",
                  "oid" : "",
                  "plainText" : "Anos:",
                  "formattedText" : "Anos:"
                }
              },
              "metadata" : null,
              "fillingRules" : null,
              "extents" : "SurveyItem",
              "objectType" : "GridInteger",
              "templateID" : "MEDC11a",
              "customID" : "MEDC11a_1",
              "dataType" : "Integer"
            },
            {
              "layout" : {
                "extents" : "StudioObject",
                "objectType" : "LayoutGrid",
                "width" : "100"
              },
              "unit" : {
                "ptBR" : {
                  "extends" : "StudioObject",
                  "objectType" : "Unit",
                  "oid" : "",
                  "plainText" : "0 a 11 meses",
                  "formattedText" : "0 a 11 meses"
                }
              },
              "label" : {
                "ptBR" : {
                  "extends" : "StudioObject",
                  "objectType" : "Label",
                  "oid" : "",
                  "plainText" : "Meses:",
                  "formattedText" : "Meses:"
                }
              },
              "metadata" : null,
              "fillingRules" : null,
              "extents" : "SurveyItem",
              "objectType" : "GridInteger",
              "templateID" : "MEDC11b",
              "customID" : "MEDC11b_1",
              "dataType" : "Integer"
            },
            {
              "layout" : {
                "extents" : "StudioObject",
                "objectType" : "LayoutGrid",
                "width" : "100"
              },
              "unit" : {
                "ptBR" : {
                  "extends" : "StudioObject",
                  "objectType" : "Unit",
                  "oid" : "",
                  "plainText" : "0 a 30 dias",
                  "formattedText" : "0 a 30 dias"
                }
              },
              "label" : {
                "ptBR" : {
                  "extends" : "StudioObject",
                  "objectType" : "Label",
                  "oid" : "",
                  "plainText" : "Dias:",
                  "formattedText" : "Dias:"
                }
              },
              "metadata" : null,
              "fillingRules" : null,
              "extents" : "SurveyItem",
              "objectType" : "GridInteger",
              "templateID" : "MEDC11c",
              "customID" : "MEDC11c_1",
              "dataType" : "Integer"
            }
          ]
        }
      ],
      "label" : {
        "ptBR" : {
          "extends" : "StudioObject",
          "objectType" : "Label",
          "oid" : "",
          "plainText" : "07. Há quanto tempo o(a) Sr(a) usa esse medicamento?n",
          "formattedText" : "<div>07. Há quanto tempo o(a) Sr(a) usa esse medicamento?</div>"
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
      "metadata" : {
        "extents" : "StudioObject",
        "objectType" : "MetadataGroup",
        "options" : [
          {
            "extends" : "StudioObject",
            "objectType" : "MetadataAnswer",
            "dataType" : "Integer",
            "value" : 1,
            "extractionValue" : ".Q",
            "label" : {
              "ptBR" : {
                "extends" : "StudioObject",
                "objectType" : "Label",
                "oid" : "",
                "plainText" : "Não quer respondern",
                "formattedText" : "<div>Não quer responder</div>"
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
            }
          },
          {
            "extends" : "StudioObject",
            "objectType" : "MetadataAnswer",
            "dataType" : "Integer",
            "value" : 2,
            "extractionValue" : ".S",
            "label" : {
              "ptBR" : {
                "extends" : "StudioObject",
                "objectType" : "Label",
                "oid" : "",
                "plainText" : "Não sabe",
                "formattedText" : "Não sabe"
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
            }
          },
          {
            "extends" : "StudioObject",
            "objectType" : "MetadataAnswer",
            "dataType" : "Integer",
            "value" : 3,
            "extractionValue" : ".A",
            "label" : {
              "ptBR" : {
                "extends" : "StudioObject",
                "objectType" : "Label",
                "oid" : "",
                "plainText" : "Não se aplica",
                "formattedText" : "Não se aplica"
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
            }
          },
          {
            "extends" : "StudioObject",
            "objectType" : "MetadataAnswer",
            "dataType" : "Integer",
            "value" : 4,
            "extractionValue" : ".F",
            "label" : {
              "ptBR" : {
                "extends" : "StudioObject",
                "objectType" : "Label",
                "oid" : "",
                "plainText" : "Não há dados",
                "formattedText" : "Não há dados"
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
            }
          }
        ]
      },
      "fillingRules" : {
        "extends" : "StudioObject",
        "objectType" : "FillingRules",
        "options" : {
          "mandatory" : {
            "data" : {
              "reference" : true,
              "canBeIgnored" : false
            },
            "extends" : "StudioObject",
            "objectType" : "Rule",
            "validatorType" : "mandatory"
          }
        }
      },
      "extents" : "SurveyItem",
      "objectType" : "GridIntegerQuestion",
      "templateID" : "MEDC11",
      "customID" : "MEDC011_1",
      "dataType" : null
    };

    controller.itemData = Mock.itemData;
  }


});
