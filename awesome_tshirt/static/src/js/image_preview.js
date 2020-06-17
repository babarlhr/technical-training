odoo.define('awesome_tshirt.imagePreview', function (require){
	'use strict';

	var basicFields = require('web.basic_fields');
	var fieldRegistry = require('web.field_registry');

	var Core = require('web.core');
	var _t = Core._t;

	var FieldChar = basicFields.FieldChar;

	var imagePreview = FieldChar.extend({

		isSet: function () {
			return true;
		},
		_renderReadonly: function () {
			if (this.value) {
				this.$el.html($('<img>', {
					class: 'o_imagePreview',
					src: this.value,
				}));
			}
			else {
				this.$el.text(_t("MISSING TSHIRT DESIGN!"));
				this.$el.addClass('badge-pill badge-danger');
			}
		},
	});
	fieldRegistry.add('imagePreview', imagePreview);
	return imagePreview;
});