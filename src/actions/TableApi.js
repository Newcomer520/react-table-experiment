var TableDispatcher = require('../dispatcher/TableDispatcher');
var TableConstants = require('../constants/TableConstants');

var $ = require('jquery');
var _ = require('underscore');


var TableApi = function(tableId) {	
	var _tableId = tableId;
	function handleViewAction(action) {
		action.tableId = _tableId;
		TableDispatcher.handleViewAction(action);
	}
	var api = {
		getData: function(url) {
			handleViewAction({
				actionType: TableConstants.TABLE_PENDING
			});

			$.ajax({
				type: 'GET',
				url: url
			})
			.done(function(data) {
				handleViewAction({
					actionType: TableConstants.TABLE_GOTDATA,
					data: data
				});
			})
			.fail(function(jqXHR, status, errorThrown) {
				handleViewAction({
					actionType: TableConstants.TABLE_FAIL_FETCHINGDATA,
					message: errorThrown,
					statusCode: status
				});
			})
			.always(function() {

			});
		},
		simulateGettingData: function() {
			handleViewAction({
				actionType: TableConstants.TABLE_PENDING
			});
			window.setTimeout(function() {
				var cnt = Math.floor(Math.random() * 20) + 5;
				var data = _.range(cnt).map(function(v) {
					return {
						pernr: Math.floor(Math.random() * 100),
						cname: Math.floor(Math.random() * 10)
					};
				});
				handleViewAction({
					actionType: TableConstants.TABLE_GOTDATA,
					data: data
				});
			}, 5000);
		}
	}

	return api;
}
module.exports = TableApi;