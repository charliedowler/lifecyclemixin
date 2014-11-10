(function() {
  'use strict';

  function handleEvent(event) {
    var objs = [];
    for (var s in this.state) {
      objs.push(this.state[s]);
    }
    objs = objs.filter(function(state) {
      return state && state._events;
    }).forEach(function(obj) {
      obj.trigger(event);
    });
  }

  var mixin = {};

  [ 'componentWillMount',
    'componentDidMount',
    'componentWillUnmount',
    'componentDidUnmount',
    'componentDidUpdate'
  ].forEach(function(event) {
    mixin[event] = function() {
      handleEvent.call(this, event);
    };
  });

  if (typeof module !== 'undefined' && 'exports' in module) {
    module.exports = mixin;
  } else if (typeof define !== 'undefined') {
    define(function(require, exports, module) {
      module.exports = mixin;
    }, []);
  } else if (typeof window !== 'undefined') {
    window.lifeCycleMixin = mixin;
  }
})();
