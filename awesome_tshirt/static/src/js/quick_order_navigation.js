odoo.define('awesome_tshirt.quickOrderNavigation', function (require) {
	'use strict';

	var Widget = require('web.Widget');
	var SystrayMenu = require('web.SystrayMenu');

	var Core = require('web.core');
	var _t = Core._t;

	var QuickOrderNavigation = Widget.extend({
		template: 'awesome_tshirt.quick_order_navigation',

		events: {
			'keypress .o_input': '_onKeypress',
		},

		_onKeypress: function (ev) {
			var keycode = ev.keyCode || ev.which;
			if (keycode == '13') {
				var id = parseInt(this.$('.o_input').val(), 10);
				if (!isNaN(id)) {
					this.do_action({
						res_id: id,
						res_model: 'awesome_tshirt.order',
						target: 'new',
						type: 'ir.actions.act_window',
						views: [[false, 'form']],
					});
				}
				else
					this.do_warn(_t('Failure'), _t("Invalid ID"));
			}
		},
	});
	SystrayMenu.Items.push(QuickOrderNavigation);
});