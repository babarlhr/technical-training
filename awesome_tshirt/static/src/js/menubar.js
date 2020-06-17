odoo.define('awesome_tshirt.menubar', function(require) {
    'use strict';
    
    var Core = require('web.core');
    var Widget = require('web.Widget');

    var Menubar = Widget.extend({
        template: 'awesome_tshirt.menubar',

        events: {
            'click .o_customers_btn': '_onGetCustomers',
            'click .o_new_orders_btn': '_onGetNewOrders',
            'click .o_cancelled_orders_btn': '_onGetCancelledOrders'
        },
        init: function (parent) {
            this._super(parent);
        },
        _onGetCustomers: function () {
            this.do_action('base.action_partner_customer_form');
        },
        _lastWeek: function (){
            return new Date(new Date().getTime() - 604800000)
        },
        _onGetNewOrders: function (ev) {
            this.trigger_up('getStateOrders', {
                state: 'new',
                create_date: this._lastWeek(),
            });
        },
        _onGetCancelledOrders: function (ev) {
            this.trigger_up('getStateOrders', {
                state: 'cancelled',
                create_date: this._lastWeek(),
            });
        }
    });
    Core.action_registry.add('awesome_tshirt.menubar', Menubar);
    return Menubar;
});
