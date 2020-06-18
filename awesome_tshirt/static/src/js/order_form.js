odoo.define('awesome_tshirt.orderFormView', function (require) {
    'use strict';

    var Core = require('web.core');
    var viewRegistry = require('web.view_registry');

    var formController = require('web.FormController');
    var formView = require('web.FormView');

    var qweb = Core.qweb;

    var orderFormController = formController.extend({
        events: {
            'click .o_printLabel': '_onPrintLabel',
        },
        init: function () {
            this._super.apply(this, arguments);
            this.clicked = false;
        },
        renderButtons: function () {
            this._super.apply(this, arguments);
            this.$buttons.addClass('o_order_form_buttons');
            this.$buttons.prepend(qweb.render('orderForm.buttons'));
        },
        _onPrintLabel: function () {
            if (this.clicked)
                return ;
            this.clicked = true;
            var resId = this.model.get(this.handle, {raw: true}).res_id;
            this._rpc({
                model: 'awesome_tshirt.order',
                method: 'print_label',
                args: [resId],
            }).then(() => {
                this.clicked = false;
                this.reload();
            });
        },
        _updateButtons: function () {
            this._super.apply(this, arguments);
            if (this.$buttons) {
                var rec = this.model.get(this.handle, {raw: true});
                var state = rec.data.state === 'printed';
                var editMode = this.mode === 'edit';
                this.$('.o_printLabel')
                    .toggleClass('btn-primary', state)
                    .toggleClass('btn-secondary', !state)
                    .attr('disabled', editMode);
            }
        },
    });

    var orderFormView = formView.extend({
        config: _.extend({}, formView.prototype.config, {
            Controller: orderFormController,
        }),
    });
    viewRegistry.add('orderFormView', orderFormView);
    return orderFormView;
});