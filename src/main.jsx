//require('./style.css');
var React = require('react');
var Table = require('./ui/table.jsx');
var TextBox = require('./ui/textbox.jsx');

var TableDispatcher = require('./dispatcher/TableDispatcher.js');



var tbStyle = {
	width: '100px',
	height: '50px'
};

var columns = [
	{ field: 'pernr', name: 'EMP NO'},
	{ field: 'cname', name: 'CNAME', style: {width: '100px'	}}
]
,	columns2 = [
	{field: 'pernr', name: '工號', style: { width: '200px'} },
	{name: 'Group', columns: columns}
]
,	columns3 = {
	name: 'big group',
	columns: columns2
}
,	columns5 = {
		style: {'background-color': 'pink'},
		columns:[{ name: 'group 01'}, columns3]
		//columns:[{ name: 'group 01', field:'pernr'}]
	}
,	options = {
		freezeRowsHeight: true,
		style: {
			height: '196px',
			//width: '500px',
			border: '1px solid red'
		},		
		dataProvider: function() {
		}
	}
,	options2 = {
		freezeRowsHeight: true,		
		height: '200px',
		dataProvider: function() {
		}
	};

/*React.render(
	<Table columns={columns} />,
	document.getElementById('tb01')
);*/
React.render(
	<Table id="table01" columns={columns5} options={options} />,
	document.getElementById('tb02')
);
/*React.render(
	<Table id="table02" columns={columns5} options={options2} />,
	document.getElementById('tb01')
);*/
/*React.render(
	<Table columns={columns3} />,
	document.getElementById('tb01')
)*/
/*
React.render(
	<div style={tbStyle}><TextBox /></div>,
	document.getElementById('tb01'))*/
