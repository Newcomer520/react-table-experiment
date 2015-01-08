var React = require('react')
,	_ = require('underscore')
,	Cell = require('./cell.jsx');

var  Row = React.createClass({
	propTypes: {
		row: React.PropTypes.object.isRequired,
		fields: React.PropTypes.array.isRequired
	},
	render: function() {
		var cells = [];
		var row = this.props.row
		,	fields = this.props.fields;

		fields.forEach(function(field, idx) {
			var cellKey = row.uniqueKey + '-' + idx;
			var text = null;
			if(!_.isUndefined(row[field.name]))
				text = row[field.name];
				
			cells.push(
				<Cell key={cellKey} row={row} behavior={field.behavior}>{text}</Cell>
			);
			
		}, this);
		return (
			<div className="default-row">
				{cells}
			</div>
		);
	}
});

module.exports = Row;