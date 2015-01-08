var React = require('react');
var _ = require('underscore');

var Cell = React.createClass({
	propTypes: {
		
	},
	componentDidMount: function() {		
	},
	componentDidUpdate: function() {
	},
	render: function() {
		//var s = _.extend({}, this.props.behavior, {'height': undefined})
		return (
			<div className="cell">{this.props.children}</div>
		);
	}

});

module.exports = Cell;