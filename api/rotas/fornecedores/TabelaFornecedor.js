const Modelo = require('./ModeloTabelaFornecedor')
const NotFound = require('../../erros/NotFound')

module.exports = {
    listar() {
        return Modelo.findAll()
    },
    inserir(fornecedor) {
        return Modelo.create(fornecedor)
    },
    async pegarPorId(id) {
        const fornecedor = await Modelo.findOne({
            where: {
                id: id
            }
        });
        if (!fornecedor) {
            throw new NotFound()
        }
        return fornecedor
    },
    atualizar(id, dadosAtualizados) {
        return Modelo.update(dadosAtualizados, {
            where: {
                id: id
            }
        })
    },

    remover(id) {
        return Modelo.destroy({
            where: {
                id: id
            }
        })
    }
}