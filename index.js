(function() {

  var manual = [];

  function handleEvent(event) {
    for (var m in manual) {
      manual[m].trigger(event);
    }
    for (var s in this.state) {
      var state = this.state[s];
      state._events && state.trigger(event);
    }
  }

  var mixin = {};

  [ 'componentWillMount',
    'componentDidMount',
    'componentDidUpdate',
    'componentWillUnmount'
  ].forEach(function(event) {
    mixin[event] = function() {
      handleEvent.call(this, event);
    };
  });

  mixin.addLifecycleListener = function(obj) {
    if (!obj._events) {
      throw new Error('Invalid Backbone object');
    }
    manual.push(obj);
  };
  mixin.removeLifecycleListener = function(obj) {
    for (var m in manual) {
      if (manual[m] == obj) {
        manual.splice(m, 1);
      }
    }
  };

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
