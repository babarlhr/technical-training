odoo.define('awesome_tshirt.dashboard', function(require){
    'use strict';
    
    var Core = require('web.core');
    var AbstractAction = require('web.AbstractAction');

    var Dashboard = AbstractAction.extend({
        template: "awesome_tshirt.dashboard",
        
        start: function () {
            var Counter = require('awesome_tshirt.counter');
            var counter = new Counter(this, 0);
            counter.appendTo(this.$('.counter'));
        },
    });
    Core.action_registry.add('awesome_tshirt.dashboard', Dashboard);
    return Dashboard;
});
