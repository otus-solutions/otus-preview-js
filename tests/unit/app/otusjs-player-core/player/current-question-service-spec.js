xdescribe('Current Question Service', function() {
    var Mock = {};
    var service;
    var items = [Mock.question, 2, 3];
    beforeEach(function() {
        module('otusjs.player.core');
        inject(function(_$injector_) {
            service = _$injector_.get('otusjs.player.core.CurrentQuestion');
            mockValidateService(_$injector_);
            mockPlayerService(_$injector_);

        });
    });

    describe('a new question setting', function() {
        it('should call setValidation on ValidateService w question and empty answer', function() {
            spyOn(Mock.ValidateService, 'setValidation');
            service.setQuestion(Mock.question);

            expect(Mock.ValidateService.setValidation).toHaveBeenCalledWith(Mock.question, {});
        });

        it('should get an empty object when call for answer before there is one', function() {
            service.setQuestion(Mock.question);
            answer = service.getAnswer();

            expect(answer).toEqual({});
        });

        it('should return the given answer', function() {
            service.setQuestion(Mock.question);
            service.setAnswer('ans');
            answer = service.getAnswer();

            expect(answer).toEqual('ans');
        });
    });

    function mockValidateService($injector) {
        Mock.ValidateService = $injector.get('otusjs.player.core.ValidateService');
        return Mock.ValidateService;
    }


    function mockPlayerService($injector) {
        Mock.PlayerService = $injector.get('otusjs.player.core.PlayerService');

        return Mock.PlayerService;
    }

    Mock.question = {
        "extents": "SurveyItem",
        "objectType": "CalendarQuestion",
        "templateID": "VAL1",
        "customID": "VAL1",
        "dataType": "LocalDate",
        "label": {
            "ptBR": {
                "extends": "StudioObject",
                "objectType": "Label",
                "oid": "",
                "plainText": "",
                "formattedText": ""
            },
            "enUS": {
                "extends": "StudioObject",
                "objectType": "Label",
                "oid": "",
                "plainText": "",
                "formattedText": ""
            },
            "esES": {
                "extends": "StudioObject",
                "objectType": "Label",
                "oid": "",
                "plainText": "",
                "formattedText": ""
            }
        },
        "metadata": {
            "extents": "StudioObject",
            "objectType": "MetadataGroup",
            "options": []
        },
        "fillingRules": {
            "extends": "StudioObject",
            "objectType": "FillingRules",
            "options": {
                "mandatory": {
                    "extends": "StudioObject",
                    "objectType": "Rule",
                    "validatorType": "mandatory",
                    "data": {
                        "reference": true
                    }
                },
                "rangeDate": {
                    "extends": "StudioObject",
                    "objectType": "Rule",
                    "validatorType": "rangeDate",
                    "data": {
                        "reference": {
                            "initial": "2016-09-01T03:00:00.000Z",
                            "end": "2016-10-01T03:00:00.000Z"
                        }
                    }
                },
                "minDate": {
                    "extends": "StudioObject",
                    "objectType": "Rule",
                    "validatorType": "minDate",
                    "data": {
                        "reference": "2016-07-01T03:00:00.000Z"
                    }
                },
                "maxDate": {
                    "extends": "StudioObject",
                    "objectType": "Rule",
                    "validatorType": "maxDate",
                    "data": {
                        "reference": "2016-12-01T02:00:00.000Z"
                    }
                }
            }
        }
    };
});
