const assert = require('assert')
const Mongodb = require('../db/strategies/mongodb/mongodb')
const heroiSchema = require('../db/strategies/mongodb/schemas/herosSchema')
const Context = require('../db/strategies/base/contextStrategy')

let context = {}
const MOCK_CADASTRAR = {
    nome: 'Mulher Maravilha',
    poder: 'Força'
}

const MOCK_HEROI_DEFAULT = {
    nome: `Homem Haranha ${Date.now()}`,
    poder: 'Super teia'
}

const MOCK_HEROI_ATUALIZAR = {
    nome: `Patolino ${Date.now()}`,
    poder: 'velocidade'
}
let MOCK_HEROI_ID = ''

describe('Mongodb suite de testes', () => {
    before(async () => {
        const connection = await Mongodb.connect()
        context = new Context(new Mongodb(connection, heroiSchema))

        await context.create(MOCK_HEROI_DEFAULT)
        const results = await context.create(MOCK_HEROI_ATUALIZAR)
        MOCK_HEROI_ID = results.id
    })
    it('verificar conexão', async() => {
        const connect = await context.isConnected()
        assert.deepEqual(connect, 'Conectado')
    })

    it('Cadastrar', async () => {
        const { nome, poder } = await context.create(MOCK_CADASTRAR)
        assert.deepEqual({ nome, poder }, MOCK_CADASTRAR)
    })

    it('listar', async () => {
        const [{ nome, poder }] = await context.read({ nome: MOCK_HEROI_DEFAULT.nome })       
        const result = {
            nome, poder
        }
        assert.deepEqual(result, MOCK_HEROI_DEFAULT)
    })

    it('atualizar', async() => {
        const result = await context.update(MOCK_HEROI_ID, {
            nome: 'PERNALONGA'
        })
        assert.deepEqual(result.nModified, 1)
    })
    it('remover', async () => {
        const result = await context.delete(MOCK_HEROI_ID)
        assert.deepEqual(result.n, 1)
    })
})