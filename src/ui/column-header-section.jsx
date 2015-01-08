var React = require('react')
,	ColumnHeader = require('./column-header.jsx')
,	_ = require('underscore');

var ColumnHeaderSection = React.createClass({
	propTyps: {
		columns: React.PropTypes.array.isRequired,
		columnsDidUpdate: React.PropTypes.func.isRequired
	},
	componentWillMount: function() {

	},
	componentDidMount: function() {
		this.componentDidUpdate();
	},
	componentDidUpdate: function() {
		var h = this.getDOMNode().offsetHeight;
		this.props.columnsDidUpdate(parseInt(h));
	},
	render: function() {
		return (
			<div className="column-area">
				<ColumnHeader column={this.props.columns} setting={this.props.columns.setting} style={this.props.columns.style}  />
			</div>
		);	
	}

});

module.exports = ColumnHeaderSection;