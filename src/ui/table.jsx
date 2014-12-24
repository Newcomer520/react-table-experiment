var styling =  require('../sass/styling.scss');
var ColumnHeaderSection = require('./column-header-section.jsx');
var React = require('react');
var TableStore = require('../stores/TableStore');
var TableApi = require('../actions/TableApi');
var TableConstants = require('../constants/TableConstants');


var Table = React.createClass({
	propTypes: {
		id: React.PropTypes.string.isRequired,
		columns: React.PropTypes.oneOfType([
			React.PropTypes.array.isRequired,
			React.PropTypes.object.isRequired
		])		
	},
	getInitialState: function() {
		this.TableStore = new TableStore(this.props.id);
		return this.getState();
	},
	componentWillMount: function() {		
		this.TableApi = new TableApi(this.props.id);
		console.log("TableApi: ", this.TableApi);
	},
	componentDidMount: function() {		
		this.TableStore.addChangeListener(this._onChange);
		this.TableApi.simulateGettingData();
	},
	componentWillUnmount: function() {
		this.TableStore.removeChangeListener(this._onChange);
	},
	render: function() {		
		var style = {};
		switch(this.state.current.status) {
			case TableConstants.TABLE_PENDING:
				style.backgroundColor = 'yellow';
				console.log("I am pending");
				break; 
			case TableConstants.TABLE_GOTDATA:
				console.log("Got Data");
				break;
		}		
		return (
			<div className="i-table" style={style}>
				<ColumnHeaderSection columns={this.props.columns}></ColumnHeaderSection>
			</div>
		);
	},
	TableStore: null,
	TableApi: null,
	_onChange: function() {
		this.setState(this.getState());
	},
	getState: function() {		
		return {
			rows: this.TableStore.getRows(),
			current: this.TableStore.getState()
		}
	}
});

module.exports = Table;