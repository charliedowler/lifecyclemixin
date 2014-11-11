var Backbone = require('backbone');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

jest.dontMock('../index');
var lifecyclemixin = require('../index');
describe('Fire events on backbone model', function() {
  it('should', function() {
    var willMount = false,
      willUnmount = false;

    var Model = Backbone.Model.extend({
      initialize: function() {
        this.on('componentWillMount', this.componentWillMount, this);
        this.on('componentWillUnmount', this.componentWillUnmount, this);
      },
      componentWillMount: function() {
        willMount = true;
      },
      componentWillUnmount: function() {
        willUnmount = true;
      }
    });

    var Component = React.createClass({
      mixins: [lifecyclemixin],
      getInitialState: function() {
        return {
          model: new Model()
        };
      },
      componentDidMount: function() {
        expect(willMount).toEqual(true);
      },
      componentWillUnmount: function() {
        expect(willUnmount).toEqual(true);
      },
      render: function() {
        return React.createElement('div', null, 'Hello World');
      }
    });

    var ParentComponent = React.createClass({
      getInitialState: function() {
        return {
          unmountMe: false
        };
      },
      componentDidMount: function() {
        this.setState({ unmountMe: true });
      },
      render: function() {
        return !this.state.unmountMe ? React.createElement(Component) : null;
      }
    });

    TestUtils.renderIntoDocument(React.createElement(ParentComponent));

  });
});
