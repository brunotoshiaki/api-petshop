const express = require('express')
const app = express()
const config = require('config');
const roteador = require('./rotas/fornecedores')
const NotFound = require('./erros/NotFound')

app.use(express.json());
app.use('/api/fornecedores', roteador)
app.use((erro, requisicao, resposta, proximo) => {
    let status = 500
    if (erro instanceof NotFound) {
        status = 404
    } else {
        status = 400
    }
    resposta.status(status)

    resposta.send(
        JSON.stringify({
            mensagem: erro.message,
            id: erro.idErro
        })
    )
})


app.listen(config.get('api.porta'), () => console.log('A API está funcionando!'))