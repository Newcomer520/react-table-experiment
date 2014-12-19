var Dispatcher = require('flux').Dispatcher;
var assign = require('object-assign');

var TableDispatcher = assign(new Dispatcher(), {
	handleColumn: function(action) {
		this.dispatch({
			source: 'COLUMNS_ACTION',
			action: action
		});
	}
});

module.exports = TableDispatcher;