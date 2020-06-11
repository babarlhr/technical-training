odoo.define('awesome_tshirt.counter', function(require){
    'use strict';
    
    var Core = require('web.core');
    var Widget = require('web.Widget');

    var Counter = Widget.extend({
        template: 'awesome_tshirt.counter',

        events: {
            'click button.increment': '_increment'
        },
        init: function (parent, value) {
            this._super(parent);
            this.count = value;
        },
        _update: function () {
            this.$('.val').text(this.count);
        },
        _increment: function () {
            this.count++;
            this._update();
        },
    });
    Core.action_registry.add('awesome_tshirt.counter', Counter);
    return Counter;
});
