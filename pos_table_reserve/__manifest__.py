# -*- coding: utf-8 -*-
{
    'name': "pos table reservation",

    'summary': """
        pos table reservation """,

    'description': """
        Manage Table Reservation In Odoo POS
    """,

    'author': "Smart Solutions",
    'website': "smartsolutionsit99@gmail.com",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/10.0/odoo/addons/base/module/module_data.xml
    # for the full list
    'category': 'point of sale',
    'version': '10.0',

    # any module necessary for this one to work correctly
    'depends': ['point_of_sale','pos_restaurant'],

    # always loaded
    'data': [
        # 'security/ir.model.access.csv',
        'views/views.xml',
        'views/templates.xml',
    ],
    'qweb': [
            'static/src/xml/table_reserve.xml',
        ],
    # only loaded in demonstration mode
    'demo': [
        'demo/demo.xml',
    ],
    'images': ['static/description/cover.png'],
    'auto_install': False,
    'installable': True,
    'application': True,
    'price': 25,
    'currency': 'USD',
    'support': 'smartsolutionsit99@gmail.com',
}