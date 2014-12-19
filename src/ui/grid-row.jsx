var React = require('react');

var GridRow = React.createClass({
	propTypes: {
		columns: React.Proptypes.array.isRequired,
		rawDatum: Reeact.propTypes.object.isRequired
	},
	render: function() {
		var cols = this.props.columns.map(function(col) {
			return (
				<div>{rawDatum[col.key]}</div>
			)
		});

		return (
			<div class="i-row">{cols}</div>
		);
	}
});

module.exports = GridRow;