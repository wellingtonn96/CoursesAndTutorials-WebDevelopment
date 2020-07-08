class NotImplementedException extends Error {
    constructor() {
        super('Not Emplemented Exception')
    }
} 

class ICrud {
    create(item) {
         throw new NotImplementedException()
    }

    read(query) {
        throw new NotImplementedException()
    }
    update(id, item) {
        throw new NotImplementedException()
    }

    delete(id) {
        throw new NotImplementedException()
    }
}

class Mongodb extends ICrud {
    constructor() {
        super()
    }
    
    create(item) {
        console.log('item salvo no mongodb!')
    }
}

class Postgres extends ICrud {
    constructor() {
        super()
    }

    create(item) {
        console.log('item salvo no postgres!')
    }
}

class ContextStrategy {
    constructor(strategy) {
        this._database = strategy
    }

    create(item) {
        return this._database.create(item)
    }

    read(item) {
        return this._database.read(item)
    }

    update(id, item) {
        return this._database.update(id, item)
    }

    delete(id) {
        return this._database.delete(id)
    }
}

const contextMongodb = new ContextStrategy(new Mongodb())
const contextPostgres = new ContextStrategy(new Postgres)
contextMongodb.create()
contextPostgres.create()