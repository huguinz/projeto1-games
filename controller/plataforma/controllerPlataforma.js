/***************************************************************************************
 * Objetivo: Controller responsavel pela regra de negócio do CRUD da plataforma do jogo
 * Data: 17/04/2025
 * Autor: Hugo Lopes
 * Versão: 1.0
 ***************************************************************************************/

const MESSAGE = require('../../modulo/config.js')
const platformDAO = require('../../model/DAO/plataforma.js')

const insertPlatformController = async (gamePlatform, contentType) => {
	try {
		if (contentType == 'application/json') {
			const dateValidation = /^\d+$/
			if (
				gamePlatform.nome === undefined ||
				gamePlatform.nome === null ||
				gamePlatform.nome === '' ||
				gamePlatform.nome.length > 45 ||
				gamePlatform.ano_lancamento === null ||
				gamePlatform.ano_lancamento === undefined ||
				gamePlatform.ano_lancamento === '' ||
				gamePlatform.ano_lancamento.length !== 4 ||
				typeof gamePlatform.ano_lancamento !== 'string' ||
				!dateValidation.test(gamePlatform.ano_lancamento)
			) {
				return MESSAGE.ERROR_REQUIRED_FIELDS
			} else {
				const response = await platformDAO.insertPlatform(gamePlatform)

				return response ? MESSAGE.SUCCESS_CREATED_ITEM : MESSAGE.ERROR_INTERNAL_SERVER_MODEL
			}
		} else {
			return MESSAGE.ERROR_CONTENT_TYPE
		}
	} catch (error) {
		return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
	}
}

const selectAllPlatformController = async () => {
	try {
		const gamePlatformData = {}
		const responseData = await platformDAO.selectAllPlatform()

		if (responseData != false || typeof responseData == 'object') {
			if (responseData.length > 0) {
				gamePlatformData.status = true
				gamePlatformData.status_code = 200
				gamePlatformData.items = responseData.length
				gamePlatformData.games = responseData

				return gamePlatformData
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

const selectByIdPlatformController = async (id) => {
	try {
		const gamePlatformData = {}
		const responseData = await platformDAO.selectByIdPlatform(parseInt(id))

		if (id == '' || id == null || id == undefined || id <= 0 || isNaN(id)) {
			return MESSAGE.ERROR_REQUIRED_FIELDS
		} else if (responseData !== false && typeof responseData === 'object') {
			if (responseData.length > 0) {
				gamePlatformData.status = true
				gamePlatformData.status_code = 200
				gamePlatformData.message = 'Operação realizada com sucesso!'
				gamePlatformData.jogo_encontrado = responseData

				return gamePlatformData
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

const deletePlatformController = async (id) => {
	try {
		if (id === null || id === undefined || isNaN(id) || id <= 0) {
			return MESSAGE.ERROR_REQUIRED_FIELDS
		} else {
			const isIdExists = await platformDAO.selectByIdPlatform(parseInt(id))

			if (isIdExists !== false && typeof isIdExists === 'object') {
				if (isIdExists.length === 1) {
					const requestDatabase = await platformDAO.deletePlatform(parseInt(id))

					return requestDatabase ? MESSAGE.SUCCESS_DELETED_ITEM : MESSAGE.ERROR_INTERNAL_SERVER_MODEL
				} else {
					return MESSAGE.ERROR_NOT_FOUND
				}
			} else {
				return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
			}
		}
	} catch (error) {
		return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
	}
}

const updatePlatformController = async (gamePlatform, id, contentType) => {
	try {
		if (contentType === 'application/json') {
			const dateValidation = /^\d+$/
			if (
				gamePlatform.nome === undefined ||
				gamePlatform.nome === null ||
				gamePlatform.nome === '' ||
				gamePlatform.nome.length > 45 ||
				gamePlatform.ano_lancamento === null ||
				gamePlatform.ano_lancamento === undefined ||
				gamePlatform.ano_lancamento === '' ||
				gamePlatform.ano_lancamento.length !== 4 ||
				typeof gamePlatform.ano_lancamento !== 'string' ||
				!dateValidation.test(gamePlatform.ano_lancamento)
			) {
				return MESSAGE.ERROR_REQUIRED_FIELDS
			} else {
				const isIdExists = await platformDAO.selectByIdPlatform(parseInt(id))

				if (isIdExists !== false && typeof isIdExists === 'object' && isIdExists.length === 1) {
					gamePlatform.id = parseInt(id)

					const responseData = await platformDAO.updatePlatform(gamePlatform)

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
	insertPlatformController,
	selectAllPlatformController,
	selectByIdPlatformController,
	deletePlatformController,
	updatePlatformController
}
