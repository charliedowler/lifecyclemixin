(function() {
  function handleEvent(event) {
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
