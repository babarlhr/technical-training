odoo.define('awesome_tshirt.isLate', function (require) {
	'use strict';

	var basicFields = require('web.basic_fields');
	var fieldRegistry = require('web.field_registry');

	var FieldBoolean = basicFields.FieldBoolean;

	var isLate = FieldBoolean.extend({
		className: 'o_isLate',

		init: function () {
			this._super.apply(this, arguments);
			this.lateColor = this.nodeOptions.lateColor || '#FF0000';
        	this.notLateColor = this.nodeOptions.notLateColor || '#008000';
		},
		_render: function () {
			this.$el.html($('<div>').css({
				backgroundColor: this.value ? this.lateColor : this.notLateColor
			}));
		},
	})

	fieldRegistry.add('isLate', isLate);
	return isLate;
});