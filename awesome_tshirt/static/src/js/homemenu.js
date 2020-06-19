odoo.define('awesome_tshirt.HomeMenu', function (require) {
    'use strict';

    var Core = require('web.core');
    var HomeMenu = require('web_enterprise.HomeMenu');

    var Qweb = Core.qweb;
    var Session = require('web.session');

    HomeMenu.include({

        _render: function () {
            this._super.apply(this, arguments);
            this.$('.o_custom_message').remove();
            this.$el.prepend(Qweb.render('HomeMenu.CustomMessage', {
                message: Session.home_custom_msg,
            }));
        },
    });
});