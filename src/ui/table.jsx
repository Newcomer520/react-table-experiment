var styling =  require('../sass/styling.scss');
var ColumnHeaderSection = require('./column-header-section.jsx');
var React = require('react/addons');
var Cx = React.addons.classSet;
var TableStore = require('../stores/TableStore');
var TableApi = require('../actions/TableApi');
var TableAction = require('../actions/TableAction');
var TableConstants = require('../constants/TableConstants');
var RowsContainer = require('./rows-container.jsx');
var $ = require('jquery');
var _ = require('underscore');

var Table = React.createClass({
	propTypes: {
		id: React.PropTypes.string.isRequired,
		columns: React.PropTypes.oneOfType([
			React.PropTypes.array.isRequired,
			React.PropTypes.object.isRequired
		]),
		options: React.PropTypes.object,
		uniqueKey: React.PropTypes.string
	},
	getInitialState: function() {
		this.TableStore = new TableStore(this.props.id);
		this.TableApi = new TableApi(this.props.id);
		this.TableAction = new TableAction(this.props.id);		
		this.TableAction.initializeColumns(this.props.columns);
		return this.getState();
	},
	componentWillMount: function() {				
	},
	componentDidMount: function() {		
		this.TableStore.addChangeListener(this._onChange);
		this.TableApi.simulateGettingData();
		$(window).on('resize', this.redraw);
		//window.addEventListener("resize", this.redraw);
	},
	componentDidUpdate: function() {

	},
	componentWillUnmount: function() {
		this.TableStore.removeChangeListener(this._onChange);
		$(window).off('resize', this.redraw);
		//window.removeEventListener("resize", this.redraw);
	},
	render: function() {		
		var style = {};
		var pending = null;
		switch(this.state.current.status) {
			case TableConstants.TABLE_PENDING:
				pending = (
					<div className="pending">
						Pending..
					</div>
				);
				console.log("I am pending");
				break; 
			case TableConstants.TABLE_GOTDATA:
				console.log("Got Data");
				break;
		}
		var tableClass= Cx({
			'i-table': true,
			'pending': this.state.current.status === TableConstants.TABLE_PENDING
		});
		style = this.props.options && this.props.options.style ? this.props.options.style: undefined;
		style = _.extend(style, {overflow: 'auto'});
		return (
			<div style={style}>			
				<div className={tableClass}>
					<ColumnHeaderSection ref="columnHeaders" columns={this.state.columns} columnsDidUpdate={this.columnsDidUpdate}></ColumnHeaderSection>
					<RowsContainer ref="rowsContainer" rows={this.state.rows} fields={this.state.fields} options={this.props.options} style={this.state.rowsContainer.style} />
					{pending}
				</div>
			</div>
		);
	},
	TableStore: null,
	TableApi: null,
	TableAction: null,
	_onChange: function() {
		this.setState(this.getState());
	},
	handleColumnBehavior: function(column, columnBehavior) {
		//this.TableStore
	},
	columnsDidUpdate: function(colsContainerHeight) {
		var t = this.refs.rowsContainer.getDOMNode().style.top ?
			parseInt(this.refs.rowsContainer.getDOMNode().style.top) : 0;
		if(t === colsContainerHeight)
			return;
		this.setState(this.getState(colsContainerHeight));
	},
	getState: function(rowsContainerTop) {
		var rows = this.TableStore.getRows()
		,	fields = this.TableStore.getFields();
		rows.forEach(function(row, idx) {
			if(row.uniqueKey)
				return;
			if(this.props.uniqueKey) {
				row.uniqueKey = this.props.id + '-row-' + row[this.props.uniqueKey];
			}
			else {
				row.uniqueKey = this.props.id + '-row-' + Math.random();
			}
		}, this);
		return {
			columns: this.TableStore.getColumns(),
			rows: rows,
			fields: fields,
			current: this.TableStore.getState(),
			rowsContainer: {
				style: {
					top: rowsContainerTop
				}
			}
		}
	},
	redraw: function() {
		console.log('resize here');
	}
});

module.exports = Table;