var TableDispatcher = require('../dispatcher/TableDispatcher');
var TableConstants = require('../constants/TableConstants');
var BaseAction = require('./baseAction');

var TableAction = function(tableId) {
	var base = new BaseAction(tableId);

	var _tableId = tableId;
	var tableAction = {
		initializeColumns: function(cols) {
			console.log('initialize cols in tableaction...');
			var action = {
				actionType: TableConstants.COLUMNS_INIT,
				columns: cols
			};
			base.handleViewAction(action);
		}
	}
	return tableAction;
}

module.exports = TableAction;
