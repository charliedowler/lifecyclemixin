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
  var mixin = {
    componentWillMount: function() {
      handleEvent.call(this, 'componentWillMount');
    },
    componentDidMount: function() {
      handleEvent.call(this, 'componentDidMount');
    },
    componentWillUnmount: function() {
      handleEvent.call(this, 'componentWillUnmount');
    },
    componentDidUnmount: function() {
      handleEvent.call(this, 'componentDidUnmount');
    },
    componentDidUpdate: function() {
      handleEvent.call(this, 'componentDidUpdate');
    }
  };


  if (typeof module !== 'undefined' && 'exports' in module) {
    var _ = require('underscore');
    module.exports = mixin;
  } else if (typeof define !== 'undefined') {
    define(function(require, exports, module) {
      module.exports = mixin;
    }, []);
  } else if (typeof window !== 'undefined') {
    window.lifeCycleMixin = mixin;
  }
})();
