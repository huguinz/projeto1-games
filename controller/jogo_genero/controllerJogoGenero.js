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

const selectAllGameGenreController = async () => {
	try {
		let gameGenreData = {}
		let responseData = await jogoGeneroDAO.selectAllGameGenre()

		if (responseData !== false || typeof responseData === 'object') {
			if (responseData.length > 0) {
				gameGenreData.status = true
				gameGenreData.status_code = 200
				gameGenreData.items = gameGenreData.length
				gameGenreData.games = responseData

				return gameGenreData
			} else {
				return MESSAGE.ERROR_NOT_FOUND
			}
		} else {
			return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
		}
	} catch (error) {
		return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
	}
}

const selectByIdGameGenreControler = async (id) => {
	try {
		let gameGenreData = {}
		let responseData = await jogoGeneroDAO.selectByIdGameGenre(parseInt(id))

		if (id == '' || id == null || id == undefined || id <= 0 || isNaN(id)) {
			return MESSAGE.ERROR_REQUIRED_FIELDS
		} else if (responseData !== false && typeof responseData === 'object') {
			if (resultJogo.length > 0) {
				gameGenreData.status = true
				gameGenreData.status_code = 200
				gameGenreData.message = 'Operação realizada com sucesso!'
				gameGenreData.jogo_encontrado = responseData

				return gameGenreData
			} else {
				return MESSAGE.ERROR_NOT_FOUND
			}
		} else {
			return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
		}
	} catch (error) {
		return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
	}
}

module.exports = {
	insertGameGenreController,
	selectAllGameGenreController,
	selectByIdGameGenreControler
}
