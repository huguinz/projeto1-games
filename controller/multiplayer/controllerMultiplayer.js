/***************************************************************************************
 * Objetivo: Controller responsavel pela regra de negócio do CRUD do multiplayer do jogo
 * Data: 17/04/2025
 * Autor: Hugo Lopes
 * Versão: 1.0
 ***************************************************************************************/

const MESSAGE = require('../../modulo/config.js')
const multiplayerDAO = require('../../model/DAO/multiplayer.js')

const insertMultiplayerController = async (gameMultiplayer, contentType) => {
	try {
		if (contentType == 'application/json') {
			if (
				gameMultiplayer.modo_jogo === undefined ||
				gameMultiplayer.modo_jogo === null ||
				gameMultiplayer.modo_jogo === '' ||
				gameMultiplayer.modo_jogo.length > 45
			) {
				return MESSAGE.ERROR_REQUIRED_FIELDS
			} else {
				const response = await multiplayerDAO.insertMultiplayer(gameMultiplayer)

				return response ? MESSAGE.SUCCESS_CREATED_ITEM : MESSAGE.ERROR_INTERNAL_SERVER_MODEL
			}
		} else {
			return MESSAGE.ERROR_CONTENT_TYPE
		}
	} catch (error) {
		return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
	}
}

const selectAllMultiplayerController = async () => {
	try {
		const gameMultiplayerData = {}
		const responseData = await multiplayerDAO.selectAllMultiplayer()

		if (responseData !== false || typeof responseData === 'object') {
			if (responseData.length > 0) {
				gameMultiplayerData.status = true
				gameMultiplayerData.status_code = 200
				gameMultiplayerData.items = responseData.length
				gameMultiplayerData.multiplayers = responseData

				return gameMultiplayerData
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

const selectByIdMultiplayerControler = async (id) => {
	try {
		const gameMultiplayerData = {}
		const responseData = await multiplayerDAO.selectByIdMultiplayer(parseInt(id))

		if (id == '' || id == null || id == undefined || id <= 0 || isNaN(id)) {
			return MESSAGE.ERROR_REQUIRED_FIELDS
		} else if (responseData !== false && typeof responseData === 'object') {
			if (responseData.length > 0) {
				gameMultiplayerData.status = true
				gameMultiplayerData.status_code = 200
				gameMultiplayerData.message = 'Operação realizada com sucesso!'
				gameMultiplayerData.mulyiplayer_encontrado = responseData

				return gameMultiplayerData
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

const deleteMultiplayerController = async (id) => {
	try {
		if (id == '' || id == null || id == undefined || id <= 0 || isNaN(id)) {
			return MESSAGE.ERROR_REQUIRED_FIELDS
		} else {
			id = parseInt(id)
			const isIdExists = await multiplayerDAO.selectByIdMultiplayer(id)

			if (isIdExists !== false && typeof isIdExists === 'object') {
				if (isIdExists.length === 1) {
					const responseData = await multiplayerDAO.deleteMultiplayer(id)

					return responseData ? MESSAGE.SUCCESS_DELETED_ITEM : MESSAGE.ERROR_INTERNAL_SERVER_MODEL
				} else {
					return MESSAGE.ERROR_NOT_FOUND
				}
			} else {
				return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
			}
		}
	} catch (error) {
		console.log(error)
		return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
	}
}

const updateMultiplayerController = async (gameMultiplayer, id, contentType) => {
	try {
		if (contentType === 'application/json') {
			if (
				gameMultiplayer.modo_jogo === '' ||
				gameMultiplayer.modo_jogo === undefined ||
				gameMultiplayer.modo_jogo === null ||
				gameMultiplayer.modo_jogo > 45 ||
				id === null ||
				id === undefined ||
				id <= 0 ||
				isNaN(id)
			) {
				return MESSAGE.ERROR_REQUIRED_FIELDS
			} else {
				const isIdExists = await multiplayerDAO.selectByIdMultiplayer(parseInt(id))

				if (isIdExists !== false && typeof isIdExists === 'object' && isIdExists.length === 1) {
					gameMultiplayer.id = parseInt(id)

					const responseData = await multiplayerDAO.updateMultiplayer(gameMultiplayer)

					return responseData ? MESSAGE.SUCCESS_UPDATED_ITEM : MESSAGE.ERROR_INTERNAL_SERVER_MODEL
				} else if (isIdExists.length < 1) {
					return MESSAGE.ERROR_NOT_FOUND
				} else {
					return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
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
	insertMultiplayerController,
	selectAllMultiplayerController,
	selectByIdMultiplayerControler,
	deleteMultiplayerController,
	updateMultiplayerController
}
