const express = require('express')
const app = express()
const config = require('config');
const roteador = require('./rotas/fornecedores')
const NotFound = require('./erros/NotFound')
const ValorNaoSuportado = require('./erros/ValorNaoSuportado')
const formatosAceitos = require('./Serializador').formatosAceitos

app.use(express.json());

app.use((requisicao, resposta, proximo) => {
    let formatoRequisitado = requisicao.header('Accept')
    if (formatoRequisitado === '*/*') {
        formatoRequisitado = 'application/json'
    }
    if (formatosAceitos.indexOf(formatoRequisitado) === -1) {
        resposta.status(406)
        resposta.end()
        return
    }

    resposta.setHeader('Content-Type', formatoRequisitado)
    proximo()

})

app.use('/api/fornecedores', roteador)
app.use((erro, requisicao, resposta, proximo) => {
    let status = 500
    if (erro instanceof NotFound) {
        status = 404
    }

    if (erro instanceof ValorNaoSuportado) {
        status = 406
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