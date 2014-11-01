var Backbone = require('backbone');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

jest.dontMock('../index');
var lifecyclemixin = require('../index');
describe('Fire events on backbone model', function() {
  it('should', function() {
    var willMount = false;
    var Model = Backbone.Model.extend({
      initialize: function() {
        this.on('componentWillMount', this.componentWillMount, this);
      },
      componentWillMount: function() {
        willMount = true;
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
      render: function() {
        return React.createElement('div', null, 'Hello World');
      }
    });

    TestUtils.renderIntoDocument(React.createElement(Component));

  });
});
