const assert = require('assert')
const api = require('../api')

let app = {}

describe('Auth test swith', () => {
    before(async () => {
        app = await api
    })
    it('deve obter um token', async () => {
        const result  = await app.inject({
            method: 'POST',
            url: '/login',
            payload: {
                username: 'xuxadasilva',
                password: '123'
            }
        })

        const statusCode  = result.statusCode
        const dados = JSON.parse(result.payload)
        console.log('dados', dados)
        assert.deepEqual(statusCode, 200)
        assert.ok(dados.token.length > 10)
    })
})