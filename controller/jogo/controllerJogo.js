/************************************************************************************
 * Objetivo: Controller responsavel pela regra de negócio do CRUD do jogo
 * Data: 13/02/2025
 * Autor: Hugo Lopes
 * Versão: 1.0
 ***********************************************************************************/

//Import do arquivo de configuração para mensagens e status code
const MESSAGE = require('../../modulo/config.js')

//Import do DAO para realizar o CRUD no BD
const jogoDAO = require('../../model/DAO/jogo.js')

//Função para inserir um novo jogo
const inserirJogo = async (jogo, cotentType) => {
    try {
        if(cotentType == 'application/json') {
            if(
                jogo.nome            == undefined   || jogo.nome            == ''   || jogo.nome            == null || jogo.nome.lenght            > 80 ||        
                jogo.data_lancamento == undefined   || jogo.data_lancamento == ''   || jogo.data_lancamento == null || jogo.data_lancamento.lenght > 10 ||       
                jogo.versao          == undefined   || jogo.versao          == ''   || jogo.versao          == null || jogo.versao.lenght          > 10 ||        
                jogo.tamanho         == undefined   || jogo.tamanho.lenght   > 10   ||       
                jogo.descricao       == undefined   ||  
                jogo.foto_capa       == undefined   || jogo.foto_capa.lenght > 200  ||        
                jogo.link            == undefined   || jogo.link.lenght      > 200      
            ) {
                return MESSAGE.ERROR_REQUIRED_FIELDS //400
            } else {
                //Encaminha os dados do novo jogo para ser inserido no BD
                let resultJogo = await jogoDAO.insertJogo(jogo)

                if(resultJogo) {
                    return MESSAGE.SUCCESS_CREATED_ITEM //201
                } else {
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                }
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE
        }
    } catch(error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//Funçao para atualizar jogo
const atualizarJogo = async () => {

}

//Função para excluir o jogo
const excluirJogo = async () => {

}

//Função para retornar todos os jogos
const listarJogo = async () => {
    try {
        let dadosJogos = {}

        //Chama a função para retornar os dados do jogo
        let resultJogo = await jogoDAO.selectAllJogo()

        if(resultJogo != false || typeof(resultJogo) == 'object') {
            if(resultJogo.length > 0) {
                //Cria um objeto do tipo JSON para retornar a lista de jogos
                dadosJogos.status = true
                dadosJogos.status_code = 200
                dadosJogos.items = resultJogo.length
                dadosJogos.games = resultJogo

                return dadosJogos //200
            } else {
                return MESSAGE.ERROR_NOT_FOUND //404
            }
        } else {
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para buscar um jogo
const buscarJogo = async (id) => {
    try {
        if(id !=) {

        }
    } catch (error) {
        
    }
}


module.exports = {
    inserirJogo,
    atualizarJogo,
    excluirJogo,
    listarJogo,
    buscarJogo
}