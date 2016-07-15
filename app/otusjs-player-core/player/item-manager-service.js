(function() {
    'use strict';

    angular
        .module('otusjs.player.core')
        .service('otusjs.player.core.ItemManagerService', ItemManagerService);

    function ItemManagerService() {
        var self = this;

        var _items = [];
        var _currentItemIndex = null;
        var _currentItem = null;
        var _hasNext = null;
        var _hasPrevious = null;

        /* Public methods */
        self.init = init;
        self.getItems = getItems;
        self.getCurrentItem = getCurrentItem;
        self.hasNext = hasNext;
        self.hasPrevious = hasPrevious;
        self.next = next;
        self.previous = previous;

        function init(items) {
            _items = items;
            _currentItemIndex = 0;
            _currentItem = _items[_currentItemIndex];
            _updateIterator();
        }

        function getItems() {
            return _items;
        }

        function getCurrentItem() {
            return _currentItem;
        }

        function hasNext() {
            return (_hasNext) ? true : false;
        }

        function hasPrevious() {
            return (_hasPrevious) ? true : false;
        }

        function next() {
            ++_currentItemIndex;
            _updateIterator();
            return _currentItem = _items[_currentItemIndex];
        }

        function previous() {
            return _currentItem = _items[--_currentItemIndex];
        }

        function _updateIterator() {
            _hasNext = _items[_currentItemIndex + 1];
            _hasPrevious = _items[_currentItemIndex - 1];
        }
    }

})();
