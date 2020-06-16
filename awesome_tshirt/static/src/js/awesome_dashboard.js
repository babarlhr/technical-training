odoo.define('awesome_tshirt.dashboard', function(require){
    'use strict';
    
    var Core = require('web.core');
    var AbstractAction = require('web.AbstractAction');

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
        _update_data: function () {
            this.statistics.data = this.data;
            this.statistics.appendTo(this.$('.statistics'));

            this.chart.orders_by_size = this.data.orders_by_size;
            this.chart.appendTo(this.$('.pie_chart'));
        },
        _reload: function () {
            return this._get_statistics().then(() => this._update_data());
        },
        on_attach_callback: function () {
            this._reloadInterval = setInterval(this._reload.bind(this), 30000);
        },
        on_detach_callback: function () {
            clearInterval(this._reloadInterval);
        },
        start: function () {
            var Counter = require('awesome_tshirt.counter');
            var counter = new Counter(this, 0);
            counter.appendTo(this.$('.counter'));

            var Menubar = require('awesome_tshirt.menubar');
            var menubar = new Menubar(this);
            menubar.appendTo(this.$('.menubar'));

            var Statistics = require('awesome_tshirt.statistics');
            this.statistics = new Statistics(this, this.data);
            this.statistics.appendTo(this.$('.statistics'));

            var Pie_chart = require('awesome_tshirt.pie_chart');
            this.chart = new Pie_chart(this, this.data.orders_by_size);
            this.chart.appendTo(this.$('.pie_chart'));

            this._update_data();
            this._super.apply(this, arguments);
        },
    });
    Core.action_registry.add('awesome_tshirt.dashboard', Dashboard);
    return Dashboard;
});
