odoo.define('awesome_tshirt.counter', function(require) {
    'use strict';
    
    var Core = require('web.core');
    var Widget = require('web.Widget');

    var Counter = Widget.extend({
        template: 'awesome_tshirt.counter',

        events: {
            'click .o_increment_btn': '_onIncrement',
            'click .o_decrement_btn': '_onDecrement',
        },
        init: function (parent, value) {
            this._super(parent);
            this.count = value;
        },
        _render: function () {
            this.$('.o_val').text(this.count);
        },
        _onIncrement: function () {
            this.count++;
            this._render();
        },
        _onDecrement: function () {
            this.count--;
            this._render();
        },
    });
    Core.action_registry.add('awesome_tshirt.counter', Counter);
    return Counter;
});
