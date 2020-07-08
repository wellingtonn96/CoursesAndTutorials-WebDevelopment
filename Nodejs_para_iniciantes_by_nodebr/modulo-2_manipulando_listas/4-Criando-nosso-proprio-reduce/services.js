const axios = require('axios')
const URL = 'https://swapi.co/api/people'

const obterPessoas = async nome => {
    const url = `${URL}/?search=${nome}&format=json`
    const response = await axios.get(url)
    return response.data
}


module.exports = {
    obterPessoas,
}

// obterPessoas('r2')
//     .then(resultado => {
//         console.log('resultado', resultado)
//     })
//     .catch(error => console.error('DEU RUIN', error))