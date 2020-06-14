odoo.define('awesome_tshirt.statistics', function(require){
    'use strict';
    
    var Core = require('web.core');
    var Widget = require('web.Widget');

    var Statistics = Widget.extend({
        template: 'awesome_tshirt.statistics',

        init: function(parent){
            this._super(parent);
        },
        start: function (parent) {
            return this._rpc({
                route: '/awesome_tshirt/statistics',
            }).then((data) => {
                this.$('.nb_new_orders').text(data.nb_new_orders);
                this.$('.nb_cancelled_orders').text(data.nb_cancelled_orders);
                this.$('.am_new_orders').text(data.total_amount);
                this.$('.av_am_by_orders').text(data.amount_by_orders);
                this.$('.av_time').text(data.average_time);
            });
        },
    });
    Core.action_registry.add('awesome_tshirt.statistics', Statistics);
    return Statistics;
});
