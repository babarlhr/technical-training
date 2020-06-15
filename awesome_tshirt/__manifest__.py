# -*- coding: utf-8 -*-
{
    'name': "Awesome T-Shirt",
    'summary': "Manage your custom t-shirt printing business",
    'description': """
        This app helps you to manage a business of printing customized t-shirts
        for online customers. It offers a public page allowing customers to make
        t-shirt orders.
    """,
    'author': "Odoo",
    'category': 'Extra Tools',
    'version': '2.0',
    'application': True,
    'depends': ['base', 'web'],
    'data': [
        'security/ir.model.access.csv',
        'views/awesome_tshirt_views.xml',
        'views/templates.xml',
        'views/assets.xml',
    ],
    'qweb': [
        'static/src/xml/counter.xml',
        'static/src/xml/menubar.xml',
        'static/src/xml/statistics.xml',
        'static/src/xml/dashboard.xml',
        'static/src/xml/pie_chart.xml',
    ],
    'sequence': 1,
    'license': 'AGPL-3'
}
