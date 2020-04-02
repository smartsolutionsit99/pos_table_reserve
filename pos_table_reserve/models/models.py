# -*- coding: utf-8 -*-

from odoo import models, fields, api , _

class RestaurantTable(models.Model):
    _inherit = 'restaurant.table'

    color_org = fields.Char(string='Original Color', readonly=True)
    reserved = fields.Boolean(string='Is Reserved')
    reserve_note  = fields.Char(string='Reservation Note')