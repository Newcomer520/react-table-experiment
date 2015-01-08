var TableDispatcher = require('../dispatcher/TableDispatcher');
var EventEmitter = require('events').EventEmitter;
var TableConstants = require('../constants/TableConstants');
var assign = require('object-assign');
require('../sass/styling.scss');

var CHANGE_EVENT = 'change';

var _ = require('underscore');

function resetColumns(cols) {
	var columnStructure = {
		maxNumberOfLayers: 0,
		defaultCellHeight: 30
	};	
	cols = _.isArray(cols) ? 
		{ columns: cols } : cols;
	//reset column.
	cols.columns.forEach(function(col) {
		col._localNumberOfLayer = undefined;
	});
	crColumns(cols);
	if (_.isUndefined(cols.name)) {
		cols._localNumberOfLayer--;
	}
	columnStructure.maxNumberOfLayers = cols._localNumberOfLayer;
	cols.setting = columnStructure;
	return cols;
}
/*
	Recursive creating columns
*/
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
/*
TableStore should be bound to a ID*/
var TableStore = function(tableId) {

	var _tableId = tableId;
	var _state = {
		status: TableConstants.TABLE_DEFAULT
	};
	this.rows = [];
	this.columns;
	var tableStore = assign({}, EventEmitter.prototype, {
		getRows: function() {
			return this.rows;
		}.bind(this),
		getColumns: function() {
			return this.columns;
		}.bind(this),
		getFields: function() {
			var fields = [];
			loopColumns(this.columns, fields);
			return fields;

			function loopColumns(col, fields) {
				if(!col)
					return;	
				//push field only at the last row of header.
				if(!col.columns) {
					fields.push({
						tableId: _tableId,
						name: col.field,
						behavior: col.behavior
					});
				}					
				if (!col.columns)
					return;
				col.columns.forEach(function(c) {
					loopColumns(c, fields);
				});
			}
		}.bind(this),
		addChangeListener: function(callback) {
			this.on(CHANGE_EVENT, callback);
		},
		removeChangeListener: function(callback) {
			this.removeListener(callback);
		},
		getState: function() {
			return _state;
		},
		checkIfRowEdited: function() {
			var rowEdited = false;
			this.rows.forEach(function(row) {
				if (row.isEdited === true)
					rowEdited = true;
			});
			return rowEdited;
		}.bind(this),
		emitChange: function() {
			this.emit(CHANGE_EVENT);
		}
	});	
	
	TableDispatcher.register(function(payload) {
		var action = payload.action;
		if(action.tableId !== _tableId)
			return;
		_state.status = action.actionType;
		switch(action.actionType) {
			case TableConstants.TABLE_PENDING:				
				break;
			case TableConstants.TABLE_GOTDATA:
				this.rows = action.data;
				break;
			case TableConstants.COLUMNS_INIT:
				this.columns = action.columns;
				this.columns = resetColumns(this.columns);
				break;
			case COLUMNS_WIDTH_RESIZE:

				break;
		}
		tableStore.emitChange();
	}.bind(this));
	return tableStore;
}
module.exports = TableStore;


