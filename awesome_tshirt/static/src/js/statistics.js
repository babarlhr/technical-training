odoo.define('awesome_tshirt.statistics', function(require) {
    'use strict';
    
    var Core = require('web.core');
    var Widget = require('web.Widget');

    var Statistics = Widget.extend({
        template: 'awesome_tshirt.statistics',

        init: function (parent, data) {
           this._super.apply(this, arguments);
           this.data = data;
        },
        _render: function () {
            Object.keys(this.data).map((key, value) => {
                this.$('.o_' + key).text(this.data[key])
            });
        },
        start: function () {
            this._render();
            return this._super.apply(this, arguments);
        },
    });
    Core.action_registry.add('awesome_tshirt.statistics', Statistics);
    return Statistics;
});
