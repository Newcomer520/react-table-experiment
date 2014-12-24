var TableDispatcher = require('../dispatcher/TableDispatcher');
var EventEmitter = require('events').EventEmitter;
var TableConstants = require('../constants/TableConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _ = require('underscore');
/*
TableStore should bind to a ID*/
var TableStore = function(tableId) {

	var _tableId = tableId;
	var _state = {
		status: TableConstants.TABLE_DEFAULT
	};
	var rows = [];
	var tableStore = assign({}, EventEmitter.prototype, {
		getRows: function() {
			return rows;
		},
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
			rows.forEach(function(row) {
				if (row.isEdited === true)
					rowEdited = true;
			});
			return rowEdited;
		},
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
				break;
		}
		tableStore.emitChange();
	});
	return tableStore;
}
module.exports = TableStore;


