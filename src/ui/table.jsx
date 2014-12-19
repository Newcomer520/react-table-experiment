var styling =  require('../sass/styling.scss');
var ColumnHeaderSection = require('./column-header-section.jsx');
var React = require('react');

var Table = React.createClass({
	propTypes: {
		columns: React.PropTypes.oneOfType(
			[
				React.PropTypes.array.isRequired,
				React.PropTypes.object.isRequired
			]
		)
		
	},
	render: function() {
		return (
			<div className="i-table">
				<ColumnHeaderSection columns={this.props.columns}></ColumnHeaderSection>
			</div>
		);

	}
});

module.exports = Table;