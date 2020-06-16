odoo.define('awesome_tshirt.pie_chart', function(require){
    'use strict';
    
    var Core = require('web.core');
    var Widget = require('web.Widget');

    var Pie_chart = Widget.extend({
        tagName: 'canvas',
        jsLibs: ['/awesome_tshirt/static/src/js/lib/Chart.js'],

        colors: {
            cyan:  'rgb(01, 255, 255)',
            blue:   'rgb(54, 162, 235)',
            red:    'rgb(255, 0, 0)',
            orange: 'rgb(255, 153, 51)',
            yellow: 'rgb(255, 255, 0)',
        },

        init: function (parent, orders_by_size) {
            this._super.apply(this, arguments);
            this.sizes = ['xl', 'xxl', 's', 'm', 'l'];
            this.orders_by_size = orders_by_size;
        },
        _get_colors: function () {
            return [
                this.colors.cyan, 
                this.colors.blue,
                this.colors.red, 
                this.colors.orange, 
                this.colors.yellow,
            ];
        },
        _render: function() {
            new Chart(this.el, {
                type: 'pie',
                data: {
                    labels: this.sizes,
                    datasets: [{
                        data: _.map(this.sizes, (s) => this.orders_by_size[s] || 0),
                        backgroundColor: this._get_colors(),
                    }],
                },
                options: {
                    onClick: this._open_size_orders.bind(this),
                },
            });
        },
        _open_size_orders: function (ev, chart) {
            if (chart) {
                this.trigger_up('get_size_orders', {
                    size: this.sizes[chart[0]._index],
                });
            }
        },
        start: function () {
            this._render();
            return this._super.apply(this, arguments);
        },
    });
    Core.action_registry.add('awesome_tshirt.pie_chart', Pie_chart);
    return Pie_chart;
});
