# -*- coding: utf-8 -*-
from odoo import http

# class PosTableReserve(http.Controller):
#     @http.route('/pos_table_reserve/pos_table_reserve/', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/pos_table_reserve/pos_table_reserve/objects/', auth='public')
#     def list(self, **kw):
#         return http.request.render('pos_table_reserve.listing', {
#             'root': '/pos_table_reserve/pos_table_reserve',
#             'objects': http.request.env['pos_table_reserve.pos_table_reserve'].search([]),
#         })

#     @http.route('/pos_table_reserve/pos_table_reserve/objects/<model("pos_table_reserve.pos_table_reserve"):obj>/', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('pos_table_reserve.object', {
#             'object': obj
#         })