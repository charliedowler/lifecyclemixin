# lifecyclemixin

> Fire React lifecycle events on your Backbone models, collections and views.

## Installation
```sh
$ npm install --save lifecyclemixin
```

## Usage
```js
var React = require('react');
var Backbone = require('backbone');
var lifecyclemixin = require('lifecyclemixin');

var Model = Backbone.Model.extend({
    initialize: function() {
        this.on('componentWillMount', this.componentWillMount, this);
    },
    componentWillMount: function() {
        console.log('My parent component is about to mount');
    }
});

var Component = React.createClass({
    mixins: [lifecyclemixin],
    getInitialState: function() {
        return {
            model: new Model()
        };
    },
    render: function() {
        return <div> Hello World </div>;
    }
});
```
