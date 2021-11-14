const express = require('express')
const app = express()
const config = require('config');
const roteador = require('./rotas/fornecedores')
const NotFound = require('./erros/NotFound')

app.use(express.json());
app.use('/api/fornecedores', roteador)
app.use((erro, requisicao, resposta, proximo) => {
    if (erro instanceof NotFound) {
        resposta.status(404)
    } else {
        resposta.status(400)
    }

    resposta.send(
        JSON.stringify({
            mensagem: erro.message,
            id: erro.idErro
        })
    )
})


app.listen(config.get('api.porta'), () => console.log('A API está funcionando!'))