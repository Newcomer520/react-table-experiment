var React = require('react')
,	$ = jQuery = require('jquery');
var tbStyle = {
	width: '100%',
	height: '100%',
	backgroundColor: 'red'
};

var TextBox = React.createClass({
	getInitialState: function() {
		return {
			isEditing: false,
			text: 'tst'
		}
	},
	componentDidUpdate: function() {
		if(this.state.isEditing === true) {
			this.refs.editor.getDOMNode().focus();
			$(this.refs.editor.getDOMNode()).select();
		}
	},
	onEditing: function() {
		this.setState({
			isEditing: true
		});		
	},
	onExitEditing: function() {
		this.state.text = $(this.refs.editor.getDOMNode()).val();
		this.setState({
			isEditing: false
		});
	},
	render: function() {
		if (this.state.isEditing)
			return (<textarea style={tbStyle} ref="editor" onBlur={this.onExitEditing}>{this.state.text}</textarea>);
		return <div style={tbStyle} onClick={this.onEditing}>{this.state.text}</div>;
	}
});

module.exports = TextBox;