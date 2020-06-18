odoo.define('awesome_tshirt.customerFormView', function (require) {
	'use strict';

	var Core = require('web.core');
    var viewRegistry = require('web.view_registry');

    var formController = require('web.FormController');
	var formView = require('web.FormView');

	var qweb = Core.qweb;

	var customerFormController = formController.extend({
		events: {
			'click .o_geolocalize': '_onGeolocalize',
		},

		renderButtons: function () {
			this._super.apply(this, arguments);
        	this.$buttons.addClass('o_customer_form_buttons');
        	this.$buttons.prepend(qweb.render('customerForm.buttons'));
		},
		_onGeolocalize: function () {
			var resId = this.model.get(this.handle, {raw: true}).res_id;
			        this._rpc({
			            model: 'res.partner',
			            method: 'geo_localize',
			            args: [resId],
			        }).then(() => this.reload());
		},
	});

	var customerFormView = formView.extend({
		config: _.extend({}, formView.prototype.config, {
			Controller: customerFormController,
		}),
	});
	viewRegistry.add('customerFormView', customerFormView);
	return customerFormView;
});