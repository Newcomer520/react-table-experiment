require('../sass/rows.scss');

var React = require('react/addons');
var Cx = React.addons.classSet;
var $ = require('jquery');

var	_ = require('underscore');
var Row = require('./row.jsx');

var rowsContainer = React.createClass({
	propTypes: {
		rows: React.PropTypes.array.isRequired,
		fields: React.PropTypes.oneOfType([
			React.PropTypes.object.isRequired,
			React.PropTypes.array.isRequired
		]),
		options: React.PropTypes.object
	},
	getInitialState: function() {
		return {
			verticalScrollNeeded: false
		}
	},
	componentDidMount: function() {
		this.checkVerticalScroll();
	},
	componentDidUpdate: function() {
		this.checkVerticalScroll();
	},
	render: function() {
		if(!this.props.fields)
			return null;
		var fields = this.props.fields;
		var tmp = this.props.fields.map(function(field, idx) {
			var s = {
				width: field.behavior ? field.behavior.width: undefined,
				height: '30px',
				border: '1px solid red',
				display: 'inline-block',
				boxSizing: 'border-box'
			};
			return <div key={'Table div ' + field.tableId + '-hidden-cell' + idx} style={s} />;
		});
		var rows = this.props.rows.map(function(row) {
			return <Row key={row.uniqueKey} row={row} fields={fields} />;
		}, this);
		
		var sTable = {
			width: 0
		},	sOuter = {
			width: 0
		};
		var hiddenCells = this.props.fields.map(function(field, idx) {
			var w = field.behavior && field.behavior.width ? parseInt(field.behavior.width) : 50;
			sOuter.width += w;
			if(this.state.verticalScrollNeeded && idx == fields.length - 1 && 
				(this.props.options && this.props.options.freezeRowsHeight === true)) {
				w -= 18;
			}
			sTable.width += w;
			var sHidden = {
				width: w + 'px'
			};			
			return <div className="cell" key={'Table ' + field.tableId + '-hidden-cell' + idx} style={sHidden}></div>;
		}, this);		
		sTable.width = (1 + sTable.width) + 'px';
		sOuter.width = (1 + sOuter.width) + 'px';
		sOuter = _.extend(sOuter, this.props.style);
		var outerClassName = Cx({
			'rows-container': true,
			'vertical-fixed': this.props.options && this.props.options.freezeRowsHeight === true
		});		
		return (
			<div ref="container" className={outerClassName} style={sOuter}>
				<div ref="wrapper" className="rows-wrapper" style={sTable}>
					<div className="hidden-row">
						{hiddenCells}
					</div>
					{rows}			
				</div>
			</div>
		);
	},
	/*
	check if it's necessary to show vertical scrollor.
	*/
	checkVerticalScroll: function() {
		if(!this.props.options || !this.props.options.freezeRowsHeight)
			return;
		if(!this.refs.container)
			return;
		var offsetHeight = this.refs.container.getDOMNode().offsetHeight
		,	scrollHeight = this.refs.container.getDOMNode().scrollHeight
		,	verticalScrollNeeded = (offsetHeight < scrollHeight);
		console.log(offsetHeight, scrollHeight)
		//need to refresh.
		if(this.state.verticalScrollNeeded !== verticalScrollNeeded) {
			this.setState({
				verticalScrollNeeded: verticalScrollNeeded
			});
		}
	}

});

module.exports = rowsContainer;