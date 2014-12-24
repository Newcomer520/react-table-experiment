var React = require('react')
,	_ = require('underscore');

var ColumnHeader = React.createClass({
	propTypes: {
		//columns: React.PropTypes.object.isRequired
		column: React.PropTypes.oneOfType([
			React.PropTypes.object.isRequired
		])
	},
	getInitialState: function() {
		return null;
	},
	render: function() {
		/**
		maybe there will be a recursive columnss.
		*/
				
		var header = null;		
		if (!_.isUndefined(this.props.column.name)) {
			var s = _.extend({}, this.props.style)
			,	setting = this.props.setting
			,	mL = setting.maxNumberOfLayers
			,	idx = this.props.column._idxOfLayer
			,	lL = this.props.column._localNumberOfLayer
			,	h = (this.props.setting.defaultCellHeight * (mL - idx)  / lL) + 'px'
			s = _.extend(s, {height: h});

			header = (
				<div className="header" style={s}>
					<div className="cell">
						{this.props.column.name}
					</div>
				</div>
			);
		}
		
		var children = null;
		if(!_.isUndefined(this.props.column.columns)) {
			if(_.isArray(this.props.column.columns))
				children = this.props.column.columns;			
		}
		if(!_.isNull(children)) {
			children =
			<div className="column-children">
				{children.map(function(col) {
					var s = _.extend({}, col.style);

					if (_.isUndefined(col.key)) {
						col.key = 'col-header' + Math.random();
					}
					return (
						<ColumnHeader
							key={col.key} 							
							style={s} 
							column={col}
							setting={this.props.setting} />
					);
				}, this)}
			</div>;
		}
		return (			
			<div className="column-section">
				{header}
				{children}
			</div>			
		);
	}
});

module.exports = ColumnHeader;