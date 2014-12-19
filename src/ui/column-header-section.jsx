var React = require('react')
,	ColumnHeader = require('./column-header.jsx')
,	_ = require('underscore');

var ColumnHeaderSection = React.createClass({
	propTyps: {
		columns: React.PropTypes.array.isRequired
	},
	computedColumns: function() {
		var columnStructure = {
			maxNumberOfLayers: 0,
			defaultCellHeight: 30
		};
		var cols = _.clone(this.props.columns);
		cols = _.isArray(this.props.columns) ? 
			{ columns: cols } : cols;
		crColumns(cols);
		if (_.isUndefined(cols.name)) {
			cols._localNumberOfLayer--;
		}
		columnStructure.maxNumberOfLayers = cols._localNumberOfLayer;
		cols.setting =  columnStructure;
		return cols;
	},	
	componentWillMount: function() {
		
		
	},
	render: function() {
		var cols = this.computedColumns();
		console.log('cols: ', cols);
		console.log('setting', cols.setting);
		return (
			<div className="column-area">
				<ColumnHeader column={cols} setting={cols.setting}  />
			</div>
		);	
	}

});

function crColumns(pColumn) {
	//if having children
	if(_.isUndefined(pColumn._localNumberOfLayer)) {
		pColumn._localNumberOfLayer = 1;		
	}
	if(_.isUndefined(pColumn._idxOfLayer))  {
		if (_.isUndefined(pColumn.name))
			pColumn._idxOfLayer = -1;
		else
			pColumn._idxOfLayer = 0;
	}
		

	var previousParent = pColumn
	,	parent = pColumn._parent;
	while (!_.isUndefined(parent)) {
		if (previousParent._localNumberOfLayer + 1 <= parent._localNumberOfLayer)
			break;
		parent._localNumberOfLayer++;
		previousParent = parent;
		parent = parent._parent;
	}

	if (!_.isUndefined(pColumn.columns)) {
		pColumn.columns.forEach(function(col) {
			col._parent = pColumn;
			col._idxOfLayer = pColumn._idxOfLayer + 1;
			crColumns(col);
		});	
	}	
}
module.exports = ColumnHeaderSection;