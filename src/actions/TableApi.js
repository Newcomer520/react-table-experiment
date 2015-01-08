var TableDispatcher = require('../dispatcher/TableDispatcher');
var TableConstants = require('../constants/TableConstants');

var $ = require('jquery');
var _ = require('underscore');
var BaseAction = require('./baseAction');

var TableApi = function(tableId) {	
	var _tableId = tableId;
	var tableApi = this;
	this.tableId = tableId;	
	this.baseAction = new BaseAction(tableId);
	
	var api = {
		getData: function(url) {
			tableApi.baseAction.handleViewAction({
				actionType: TableConstants.TABLE_PENDING
			});

			$.ajax({
				type: 'GET',
				url: url
			})
			.done(function(data) {
				tableApi.baseAction.handleViewAction({
					actionType: TableConstants.TABLE_GOTDATA,
					data: data
				});
			})
			.fail(function(jqXHR, status, errorThrown) {
				tableApi.baseAction.handleViewAction({
					actionType: TableConstants.TABLE_FAIL_FETCHINGDATA,
					message: errorThrown,
					statusCode: status
				});
			})
			.always(function() {

			});
		},
		simulateGettingData: function() {
			tableApi.baseAction.handleViewAction({
				actionType: TableConstants.TABLE_PENDING
			});
			window.setTimeout(function() {
				var cnt = Math.floor(Math.random() * 20) + 5;
				//var cnt = 5;
				var data = _.range(cnt).map(function(v) {
					return {
						pernr: Math.floor(Math.random() * 100),
						cname: Math.floor(Math.random() * 10)
					};
				});
				tableApi.baseAction.handleViewAction({
					actionType: TableConstants.TABLE_GOTDATA,
					data: data
				});
			}, 500);
		}
	}

	return api;
}
module.exports = TableApi;