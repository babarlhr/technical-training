odoo.define('awesome_tshirt.menubar', function(require){
    'use strict';
    
    var Core = require('web.core');
    var Widget = require('web.Widget');

    var Menubar = Widget.extend({
        template: 'awesome_tshirt.menubar',

        events: {
            'click button.customers': '_get_customers',
            'click button.new_orders': '_get_new_orders',
            'click button.cancelled_orders': '_get_cancelled_orders'
        },
        init: function (parent) {
            this._super(parent);
        },
        _get_customers: function () {
            this.do_action('base.action_partner_customer_form');
        },
        _last_week: function (){
            return new Date(new Date().getTime() - 604800000)
        },
        _get_new_orders: function (ev) {
            this.trigger_up('get_state_orders', {
                state: 'new',
                create_date: this._last_week(),
            });
        },
        _get_cancelled_orders: function (ev) {
            this.trigger_up('get_state_orders', {
                state: 'cancelled',
                create_date: this._last_week(),
            });
        }
    });
    Core.action_registry.add('awesome_tshirt.menubar', Menubar);
    return Menubar;
});
