const BaseRoute = require('./base/baseRoute')

class HeroisRoutes extends BaseRoute {
    constructor(db) {
        super()
        this.db = db
    }

    list() {
        return {
            path: '/herois',
            method: 'GET',
            handler: (request, headers) => {
                return this.db.read()
            }
        }
    }
}

module.exports = HeroisRoutes