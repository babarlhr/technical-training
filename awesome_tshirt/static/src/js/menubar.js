odoo.define('awesome_tshirt.menubar', function(require){
    'use strict';
    
    var Core = require('web.core');
    var Widget = require('web.Widget');
    var _t = Core._t;

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
        _get_orders: function (name, filter) {
            return this.do_action({
                res_model: 'awesome_tshirt.order',
                type: 'ir.actions.act_window',
                views: [[false, 'list'], [false, 'form']],
                name: name,
                domain: filter
            });
        },
        _last_week: function (){
            return new Date(new Date().getTime() - 604800000)
        },
        _get_new_orders: function () {
            return this._get_orders(
                _t('Orders created 7 days ago'),
                [
                    ['state', '=', 'new'],
                    ['create_date', '>=', this._last_week()]
                ]
            );
        },
        _get_cancelled_orders: function () {
            return this._get_orders(
                _t('Orders cancelled 7 days ago'),
                [
                    ['state', '=', 'cancelled'],
                    ['create_date', '>=', this._last_week()]
                ]
            );
        }
    });
    Core.action_registry.add('awesome_tshirt.menubar', Menubar);
    return Menubar;
});
