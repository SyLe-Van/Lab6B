const Purchase = require('../models/Purchase');

class SiteController {

    // [GET] /
    async index(req, res) {
        try {
            console.log(Purchase.find({}));
            const Purchase = await Purchase.find({});
            console.log(Purchase)
            res.json(Purchase);
        } catch (err) {
            console.log(err)
            res.status(400).json({ error: 'ERROR!' });
        }
        // res.render('home');
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController;