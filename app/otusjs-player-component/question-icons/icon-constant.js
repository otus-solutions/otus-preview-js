(function () {
  angular.module('otusjs.player.component')
    .constant('ICON', {
      'CalendarQuestion': 'date_range',
      'IntegerQuestion': 'looks_one',
      'DecimalQuestion': 'exposure_zero',
      'SingleSelectionQuestion': 'radio_button_checked',
      'CheckboxQuestion': 'check_box',
      'AutocompleteQuestion': 'youtube_searched_for',
      'FileUploadQuestion': 'attach_file',
      'GridTextQuestion': 'filter_none',
      'GridIntegerQuestion': 'filter_1',
      'PhoneQuestion': 'phone',
      'EmailQuestion': 'email',
      'TimeQuestion': 'access_time',
      'TextQuestion': 'text_format',
      'TextItem': 'message',
      'ImageItem': 'image'
    });
}());