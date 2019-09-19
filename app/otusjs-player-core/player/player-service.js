(function() {
  'use strict';

  angular
    .module('otusjs.player.core.player')
    .service('otusjs.player.core.player.PlayerService', PlayerService);

  PlayerService.$inject = [
    'otusjs.player.data.activity.ActivityFacadeService',
    'otusjs.player.core.phase.PlayerStartActionService',
    'otusjs.player.core.phase.PlayActionService',
    'otusjs.player.core.phase.AheadActionService',
    'otusjs.player.core.phase.BackActionService',
    'otusjs.player.core.phase.EjectActionService',
    'otusjs.player.core.phase.StopActionService',
    'otusjs.player.core.phase.SaveActionService'
  ];

  function PlayerService(
    ActivityFacadeService,
    PlayerStartActionService,
    PlayActionService,
    AheadActionService,
    BackActionService,
    EjectActionService,
    StopActionService,
    SaveActionService) {

    var self = this;
    var _component = null;
    var _goBackTo = null;
    var _goingBack = null;
    var _hardBlocker = null;
    var _softBlocker = null;

    self.bindComponent = bindComponent;
    self.getItemData = getItemData;
    self.goAhead = goAhead;
    self.goBack = goBack;
    self.setGoBackTo = setGoBackTo;
    self.getGoBackTo = getGoBackTo;
    self.isGoingBack = isGoingBack;
    self.play = play;
    self.setup = setup;
    self.end = end;
    self.eject = eject;
    self.stop = stop;
    self.save = save;

    /**/
    self.registerHardBlocker = registerHardBlocker;
    self.registerSoftBlocker = registerSoftBlocker;
    self.getHardBlocker = getHardBlocker;
    self.getSoftBlocker = getSoftBlocker;
    self.clearHardBlocker = clearHardBlocker;

    function registerHardBlocker(blocker) {
      _hardBlocker = blocker;
    }

    function registerSoftBlocker(blocker) {
      _softBlocker = blocker;
    }

    function getHardBlocker(){
      return _hardBlocker;
    }

    function getSoftBlocker(){
      return _softBlocker;
    }

    function clearHardBlocker(){
      _hardBlocker = null;
   }

    /**/

    function bindComponent(component) {
      _component = component;
    }

    function getItemData() {
      return ActivityFacadeService.getCurrentItem().getItems();
    }

    function goAhead() {
      AheadActionService.execute();
    }

    function goBack() {
      BackActionService.execute();
    }

    function setGoBackTo(templateID) {
      _goingBack = templateID !== null;
      _goBackTo = templateID;
    }

    function getGoBackTo() {
      return _goBackTo;
    }

    function isGoingBack() {
      return _goingBack;
    }

    function play() {
      PlayActionService.execute();
    }

    function setup() {
      PlayerStartActionService.execute();
    }

    function end() {
      _component.showBack();
    }

    function eject() {
      EjectActionService.execute();
    }

    function stop() {
      StopActionService.execute();
    }

    function save() {
      SaveActionService.execute();
    }
  }
})();
