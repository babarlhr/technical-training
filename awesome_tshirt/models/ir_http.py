from odoo import models
from odoo.http import request
import random


class IrHttp(models.AbstractModel):
    _inherit = 'ir.http'

    def session_info(self):
        result = super(IrHttp, self).session_info()

        if random.random() > 0.5:
            result['home_custom_msg'] = "Bafien is watching you"
        else:
            result['home_custom_msg'] = "Bafien is totally sane. Also, please work harder."
        return result