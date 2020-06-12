odoo.define('awesome_tshirt.counter', function(require){
    'use strict';
    
    var Core = require('web.core');
    var Widget = require('web.Widget');

    var Counter = Widget.extend({
        template: 'awesome_tshirt.counter',

        events: {
            'click button.increment': '_increment',
            'click button.decrement': '_decrement',
        },
        init: function (parent, value) {
            this._super(parent);
            this.count = value;
        },
        _render: function () {
            this.$('.val').text(this.count);
        },
        _increment: function () {
            this.count++;
            this._render();
        },
        _decrement: function () {
            this.count--;
            this._render();
        },
    });
    Core.action_registry.add('awesome_tshirt.counter', Counter);
    return Counter;
});
