//require('./style.css');
var React = require('react');
var Table = require('./ui/table.jsx');
var TextBox = require('./ui/textbox.jsx');


var TableDispatcher = require('./dispatcher/TableDispatcher.js');
var copyDispatcher = require('./dispatcher/copy-dispatcher.js');


var tbStyle = {
	width: '100px',
	height: '50px'
};

var columns = [
	{ key: 'pernr', name: 'EMP NO'},
	{ key: 'cname', name: 'CNAME'}
]
,	columns2 = [
	{key: 'pernr', name: '工號', style: { width: '200px'} },
	{key: 'colgrp', name: 'Group', columns: columns}
]
,	columns3 = {
	key: 'na',
	name: 'big group',
	columns: columns2
}
,	columns5 = [
	{ name: 'group 01'}, columns3]


/*React.render(
	<Table columns={columns} />,
	document.getElementById('tb01')
);*/
React.render(
	<Table columns={columns5} />,
	document.getElementById('tb02')
);
/*
React.render(
	<div style={tbStyle}><TextBox /></div>,
	document.getElementById('tb01'))*/
