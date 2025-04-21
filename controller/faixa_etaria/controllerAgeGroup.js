/******************************************************************************************
 * Objetivo: Controller responsavel pela regra de negócio do CRUD da faixa etária do jogo
 * Data: 17/04/2025
 * Autor: Hugo Lopes
 * Versão: 1.0
 ******************************************************************************************/

const MESSAGE = require('../../modulo/config.js')
const ageGroupDAO = require('../../model/DAO/faixa_etaria.js')

const insertAgeGroupController = async (body, contentType) => {
	try {
		if (contentType === 'application/json') {
			const allowedValues = [0, 10, 12, 14, 16, 18]

			if (
				body.classificacao === null ||
				body.classificacao === undefined ||
				body.classificacao === '' ||
				body.classificacao.length > 2 ||
				!allowedValues.includes(parseInt(body.classificacao))
			) {
				return MESSAGE.ERROR_REQUIRED_FIELDS
			} else {
				const responseDAO = await ageGroupDAO.insertAgeGroup(body)

				return responseDAO ? MESSAGE.SUCCESS_CREATED_ITEM : MESSAGE.ERROR_INTERNAL_SERVER_MODEL
			}
		} else {
			return MESSAGE.ERROR_CONTENT_TYPE
		}
	} catch (error) {
		console.log(error)
		return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
	}
}

const selectAllAgeGroupController = async () => {
	try {
		const responseDAO = await ageGroupDAO.selectAllAgeGroup()

		if (responseDAO !== false && typeof responseDAO === 'object') {
			if (responseDAO.length < 1) {
				return MESSAGE.ERROR_NOT_FOUND
			} else {
				const data = {}

				data.status = true
				data.status_code = 200
				data.items = responseDAO.length
				data.ageGroups = responseDAO

				return data
			}
		} else {
			return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
		}
	} catch (error) {
		return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
	}
}

const selectByIdAgeGroupController = async (id) => {
	try {
		if (id === null || id === undefined || id <= 0 || isNaN(id)) {
			return MESSAGE.ERROR_REQUIRED_FIELDS
		} else if (responseDAO !== false && typeof responseDAO === 'object') {
			id = parseInt(id)
			const responseDAO = await ageGroupDAO.selectByIdAgeGroup(id)
			if (responseDAO.length <= 0) {
				return MESSAGE.ERROR_NOT_FOUND
			} else {
				const data = {}

				data.status = true
				data.status_code = 200
				data.message = 'Operação realizada com sucesso!'
				data.faixa_etaria_encontrada = responseDAO

				return data
			}
		} else {
			return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
		}
	} catch (error) {
		return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
	}
}

const deleteAgeGroupController = async (id) => {
	try {
		if (id === null || id === undefined || isNaN(id) || id <= 0) {
			return MESSAGE.ERROR_REQUIRED_FIELDS
		} else {
			id = parseInt(id)
			const isIdExists = await ageGroupDAO.selectByIdAgeGroup(id)

			if (isIdExists !== false && typeof isIdExists === 'object') {
				if (isIdExists.length === 1) {
					const responseDAO = await ageGroupDAO.deleteAgeGroup(id)

					return responseDAO ? MESSAGE.SUCCESS_DELETED_ITEM : MESSAGE.ERROR_INTERNAL_SERVER_MODEL
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

const updateAgeGroupController = async (body, id, contentType) => {
	try {
		if (contentType === 'application/json') {
			const allowedValues = [0, 10, 12, 14, 16, 18]

			if (
				body.classificacao === null ||
				body.classificacao === undefined ||
				body.classificacao === '' ||
				body.classificacao.length > 2 ||
				!allowedValues.includes(parseInt(body.classificacao)) ||
				id <= 0 ||
				id === null ||
				id === undefined ||
				isNaN(id)
			) {
				return MESSAGE.ERROR_REQUIRED_FIELDS
			} else {
				id = parseInt(id)
				const isIdExists = await ageGroupDAO.selectByIdAgeGroup(id)

				if (isIdExists !== false && typeof isIdExists === 'object' && isIdExists.length === 1) {
					body.id = id
					const responseDAO = await ageGroupDAO.updateAgeGroup(body)

					return responseDAO ? MESSAGE.SUCCESS_UPDATED_ITEM : MESSAGE.ERROR_INTERNAL_SERVER_MODEL
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
	insertAgeGroupController,
	selectAllAgeGroupController,
	selectByIdAgeGroupController,
	deleteAgeGroupController,
	updateAgeGroupController
}
