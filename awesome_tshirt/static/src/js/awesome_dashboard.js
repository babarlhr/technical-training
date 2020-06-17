odoo.define('awesome_tshirt.dashboard', function(require) {
    'use strict';
    
    var Core = require('web.core');
    var AbstractAction = require('web.AbstractAction');
    var _t = Core._t;
    
    var Dashboard = AbstractAction.extend({
        template: "awesome_tshirt.dashboard",
        hasControlPanel: true,

        custom_events: {
            getSizeOrders: '_onGetSizeOrders',
            getStateOrders: '_onGetStateOrders',
        },
        _getOrders: function (name, filter) {
            return this.do_action({
                res_model: 'awesome_tshirt.order',
                type: 'ir.actions.act_window',
                views: [[false, 'list'], [false, 'form']],
                name: name,
                domain: filter
            });
        },
        _onGetSizeOrders: function (ev) {
            this._getOrders(
                _.str.sprintf(_t("%s Orders"), ev.data.size.toUpperCase()),
                [['size', '=', ev.data.size]],
            );
        },
        _onGetStateOrders: function (ev) {
            this._getOrders(
                _.str.sprintf(_t("%s Orders during last week"), ev.data.state),
                [
                    ['state', '=', ev.data.state],
                    ['create_date', '>=', ev.data.create_date]
                ],
            );
        },
        _getStatistics: function () {
            return this._rpc({
                route: '/awesome_tshirt/statistics',
            }).then((data) => {
                this.data = data;
            });
        },
        willStart: function () {
            return Promise.all([
                this._getStatistics(),
                this._super.apply(this, arguments)
                ]);
        },
        _updateData: function () {
            this.statistics.data = this.data;
            this.statistics.appendTo(this.$('.statistics'));

            this.chart.orders_by_size = this.data.orders_by_size;
            this.chart.appendTo(this.$('.pie_chart'));
        },
        _reload: function () {
            return this._getStatistics().then(() => this._updateData());
        },
        on_attach_callback: function () {
            this._reloadInterval = setInterval(this._reload.bind(this), 30000);
        },
        on_detach_callback: function () {
            clearInterval(this._reloadInterval);
        },
        start: function () {
            this._super.apply(this, arguments);

            var Counter = require('awesome_tshirt.counter');
            var counter = new Counter(this, 0);
            counter.appendTo(this.$('.o_counter'));

            var Menubar = require('awesome_tshirt.menubar');
            var menubar = new Menubar(this);
            menubar.appendTo(this.$('.o_cp_buttons'));

            var Statistics = require('awesome_tshirt.statistics');
            this.statistics = new Statistics(this, this.data);
            this.statistics.appendTo(this.$('.o_statistics'));

            var PieChart = require('awesome_tshirt.pieChart');
            this.chart = new PieChart(this, this.data.orders_by_size);
            this.chart.appendTo(this.$('.o_pie_chart'));

            this._updateData();
        },
    });
    Core.action_registry.add('awesome_tshirt.dashboard', Dashboard);
    return Dashboard;
});
