odoo.define('awesome_tshirt.pieChart', function(require) {
    'use strict';
    
    var Core = require('web.core');
    var Widget = require('web.Widget');

    var PieChart = Widget.extend({
        tagName: 'canvas',
        jsLibs: ['/awesome_tshirt/static/lib/Chart.js/Chart.js'],

        colors: {
            cyan:  'rgb(01, 255, 255)',
            blue:   'rgb(54, 162, 235)',
            red:    'rgb(255, 0, 0)',
            orange: 'rgb(255, 153, 51)',
            yellow: 'rgb(255, 255, 0)',
        },

        init: function (parent, ordersBySize) {
            this._super.apply(this, arguments);
            this.sizes = ['xl', 'xxl', 's', 'm', 'l'];
            this.ordersBySize = ordersBySize;
        },
        _getColors: function () {
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
                        data: _.map(this.sizes, (s) => this.ordersBySize[s] || 0),
                        backgroundColor: this._getColors(),
                    }],
                },
                options: {
                    onClick: this._onOpenSizeOrders.bind(this),
                },
            });
        },
        _onOpenSizeOrders: function (ev, chart) {
            if (chart && chart.length) {
                this.trigger_up('getSizeOrders', {
                    size: this.sizes[chart[0]._index],
                });
            }
        },
        start: function () {
            this._render();
            return this._super.apply(this, arguments);
        },
    });
    Core.action_registry.add('awesome_tshirt.pieChart', PieChart);
    return PieChart;
});
