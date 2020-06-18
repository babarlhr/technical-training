odoo.define('awesome_tshirt.warning', function (require) {
	'use strict';

	var Core = require('web.core');
    var Widget = require('web.Widget');

    var widgetRegistry = require('web.widget_registry');
    var _t = Core._t;

    var Warning = Widget.extend({

    	init: function (parent, rec) {
    		this._super.apply(this, arguments);
    		this.rec = rec;
    	},
    	_render: function () {
    		this.$el.empty();
    		this.$el.removeClass('alert');
    		if (!this.rec.data.image_url) {
    			this.$el.text(_t("NO IMAGE"));
				this.$el.addClass('alert alert-danger');
    		}
    		if (this.rec.data.amount > 100) {
    			this.$el.text(_t("Add promotional material"));
    			this.$el.removeClass('alert-danger');
				this.$el.addClass('alert alert-primary');
    		}
    	},
    	updateState: function (rec) {
    		this.rec = rec;
    		this._render();
    	},
    	start: function () {
    		this._render();
    		return this._super.apply(this, arguments);
    	},
    });

    widgetRegistry.add('warning', Warning);
    return Warning;

});