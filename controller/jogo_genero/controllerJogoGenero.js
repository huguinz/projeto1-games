/************************************************************************************
 * Objetivo: Controller responsavel pela regra de negócio do CRUD do gênero do jogo
 * Data: 03/04/2025
 * Autor: Hugo Lopes
 * Versão: 1.0
 ***********************************************************************************/

const MESSAGE = require('../../modulo/config.js')
const jogoGeneroDAO = require('../../model/DAO/jogo_genero.js')

const insertGameGenreController = async (gameGenre, contentType) => {
	try {
		if (contentType == 'application/json') {
			if (gameGenre.nome == undefined || gameGenre.nome == null || gameGenre.nome == '' || gameGenre.nome.length > 45) {
				return MESSAGE.ERROR_REQUIRED_FIELDS
			} else {
				const response = await jogoGeneroDAO.insertGameGenre(gameGenre)

				if (response) {
					return MESSAGE.SUCCESS_CREATED_ITEM
				} else {
					MESSAGE.ERROR_INTERNAL_SERVER_MODEL
				}
			}
		} else {
			return MESSAGE.ERROR_CONTENT_TYPE
		}
	} catch (error) {
		return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
	}
}

module.exports = {
	insertGameGenreController
}
