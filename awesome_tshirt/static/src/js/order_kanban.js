odoo.define('awesome_tshirt.orderKanbanView', function (require) {
    'use strict';

    var Core = require('web.core');
    var viewRegistry = require('web.view_registry');

    var KanbanController = require('web.KanbanController');
    var KanbanView = require('web.KanbanView');

    var QWeb = Core.qweb;
    var _lt = Core._lt;

    var orderKanbanController = KanbanController.extend({
        events: _.extend({}, KanbanController.prototype.events, {
            'click .o_customer': '_onClick',
            'input .o_customer_search': '_onSearch',
        }),
        init: function () {
            this._super.apply(this, arguments);
            this.activeCustomerID = false;
        },
        willStart: function () {
            return Promise.all([
                this._super.apply(this, arguments),
                this._getCustomers()
                ]);
        },
        start: function () {
            this.$el.addClass('o_order_kanban_view');
            this.$('.o_content').prepend(QWeb.render('OrderKanban.CustomerSidebar', {
                activeCustomerID: this.activeCustomerID,
                customers: this.customers,
            }));
            return this._super.apply(this, arguments);
        },
        reload: function (params) {
            if (this.activeCustomerID) {
                params = params || {};
                params.domain = params.domain || [];
                params.domain.push(['customer_id', '=', this.activeCustomerID]);
            }
            return Promise.all([
                this._super(params),
                this._getCustomers()
                ]);
        },
        _getCustomers: function () {
            return this._rpc({
                route: '/web/dataset/search_read',
                model: 'res.partner',
                fields: ['display_name'],
                domain: [['has_active_order', '=', true]],
            }).then((data) => {
                this.customers = data.records;
            });
        },
        _update: function () {
            return this._super.apply(this, arguments).then(() => this._updateList());
        },
        _updateList: function () {
            var searchVal = this.$('.o_customer_search').val();
            var matches = fuzzy.filter(searchVal, _.pluck(this.customers, 'display_name'));
            var indexes = _.pluck(matches, 'index');
            var customers = _.map(indexes, (index) => this.customers[index]);
            this.$('.o_customer_list').replaceWith(QWeb.render('OrderKanban.CustomerList', {
                activeCustomerID: this.activeCustomerID,
                customers: customers,
            }));
        },
        _onClick: function (ev) {
            this.activeCustomerID = $(ev.currentTarget).data('id');
            this.reload();
        },
        _onSearch: function () {
            this._updateList();
        },
    });

    var orderKanbanView = KanbanView.extend({
        config: _.extend({}, KanbanView.prototype.config, {
            Controller: orderKanbanController,
        }),
        display_name: _lt('Order Kanban'),
        icon: 'fa-th-list',
    });
    viewRegistry.add('orderKanbanView', orderKanbanView);
    return orderKanbanView;
});