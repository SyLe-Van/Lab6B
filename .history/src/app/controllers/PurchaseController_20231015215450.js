const Purchase = require('../models/Purchase');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class PurchaseController {

    
    // [GET] /course/T-shirt
    show(req, res, next) {
        Purchase.findOne({slug: req.params.slug})
            .then(purchase => {
                res.json(purchase)
            })
            .catch(next)
    }
}

module.exports = new PurchaseController;
