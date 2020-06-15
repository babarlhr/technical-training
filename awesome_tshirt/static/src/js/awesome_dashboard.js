odoo.define('awesome_tshirt.dashboard', function(require){
    'use strict';
    
    var Core = require('web.core');
    var AbstractAction = require('web.AbstractAction');
    var Pie_chart = require('awesome_tshirt.pie_chart');

    var Dashboard = AbstractAction.extend({
        template: "awesome_tshirt.dashboard",

        _get_statistics: function () {
            return this._rpc({
                route: '/awesome_tshirt/statistics',
            }).then((data) => {
                this.data = data;
            });
        },
        willStart: function () {
            return Promise.all([
                this._get_statistics(),
                this._super.apply(this, arguments)
                ]);
        },
        _display_chart: function () {
            var chart = new Pie_chart(this, this.data.orders_by_size);
            return chart.appendTo(this.$('.pie_chart'));
        },
        start: function () {
            var Counter = require('awesome_tshirt.counter');
            var counter = new Counter(this, 0);
            counter.appendTo(this.$('.counter'));

            var Menubar = require('awesome_tshirt.menubar');
            var menubar = new Menubar(this);
            menubar.appendTo(this.$('.menubar'));

            var Statistics = require('awesome_tshirt.statistics');
            var statistics = new Statistics(this, this.data);
            statistics.appendTo(this.$('.statistics'));

            this._display_chart();
        },
    });
    Core.action_registry.add('awesome_tshirt.dashboard', Dashboard);
    return Dashboard;
});
