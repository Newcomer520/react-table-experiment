var TableDispatcher = require('../dispatcher/TableDispatcher');

//var BaseAction = function(tableId) {
function BaseAction(tableId) {
	this.tableId = tableId;
	this.handleViewAction = function(action) {

		action.tableId = this.tableId;
		TableDispatcher.handleViewAction(action)
	};
}

module.exports = BaseAction;