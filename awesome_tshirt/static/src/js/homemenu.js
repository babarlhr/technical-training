odoo.define('awesome_tshirt.HomeMenu', function (require) {
    'use strict';

    var Core = require('web.core');
    var HomeMenu = require('web_enterprise.HomeMenu');

    var Qweb = Core.qweb;

    HomeMenu.include({

        willStart: function () {
            var promise = this._rpc({
                route: '/awesome_tshirt/bafienistalkingtoyou',
            }).then((data) => {
                this.msg = data;
            });
            return Promise.all([
                this._super.apply(this, arguments),
                promise
                ]);
        },
        _render: function () {
            this._super.apply(this, arguments);
            this.$('.o_custom_message').remove();
            this.$el.prepend(Qweb.render('HomeMenu.CustomMessage', {
                message: this.msg
            }));
        },
    });
});