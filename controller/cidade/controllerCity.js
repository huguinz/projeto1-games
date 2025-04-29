/******************************************************************************************
 * Objetivo: Controller responsavel pela regra de negócio do CRUD da cidade da empresa
 * Data: 29/04/2025
 * Autor: Hugo Lopes
 * Versão: 1.0
 ******************************************************************************************/

const MESSAGE = require('../../modulo/config.js')
const cityDAO = require('../../model/DAO/cidade.js')

const insertCityController = async (body, contentType) => {
	try {
		if (contentType === 'application/json') {
			if (body.cidade === undefined || body.cidade === null || typeof body.cidade !== 'string' || body.cidade.length > 145) {
				return MESSAGE.ERROR_REQUIRED_FIELDS
			} else {
				const responseDAO = await cityDAO.insertCity(body)

				return responseDAO ? MESSAGE.SUCCESS_CREATED_ITEM : MESSAGE.ERROR_INTERNAL_SERVER_MODEL
			}
		} else {
			return MESSAGE.ERROR_CONTENT_TYPE
		}
	} catch (error) {
		return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
	}
}

const selectAllCityController = async () => {
	try {
		const responseDAO = await cityDAO.selectAllCity()

		if (responseDAO !== false && typeof responseDAO === 'object') {
			if (responseDAO.length < 1) {
				return MESSAGE.ERROR_NOT_FOUND
			} else {
				const data = {}

				data.status = true
				data.status_code = 200
				data.items = responseDAO.length
				data.cities = responseDAO

				return data
			}
		} else {
			return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
		}
	} catch (error) {
		return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
	}
}

const selectByIdCityController = async (id) => {
	try {
		const responseDAO = await cityDAO.selectByIdCity(id)
		if (id === null || id === undefined || id <= 0 || isNaN(id)) {
			return MESSAGE.ERROR_REQUIRED_FIELDS
		} else if (responseDAO !== false && typeof responseDAO === 'object') {
			id = parseInt(id)
			if (responseDAO.length <= 0) {
				return MESSAGE.ERROR_NOT_FOUND
			} else {
				const data = {}

				data.status = true
				data.status_code = 200
				data.message = 'Operação realizada com sucesso!'
				data.pais_encontrado = responseDAO

				return data
			}
		} else {
			return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
		}
	} catch (error) {
		return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
	}
}

const deleteCityController = async (id) => {
	try {
		if (id === null || id === undefined || isNaN(id) || id <= 0) {
			return MESSAGE.ERROR_REQUIRED_FIELDS
		} else {
			id = parseInt(id)
			const isIdExists = await cityDAO.selectByIdCity(id)

			if (isIdExists !== false && typeof isIdExists === 'object') {
				if (isIdExists.length === 1) {
					const responseDAO = await cityDAO.deleteCity(id)

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

const updateCityController = async (body, id, contentType) => {
	try {
		if (contentType === 'application/json') {
			if (
				body.cidade === undefined ||
				body.cidade === null ||
				typeof body.cidade !== 'string' ||
				body.cidade.length > 145 ||
				id <= 0 ||
				id === null ||
				id === undefined ||
				isNaN(id)
			) {
				return MESSAGE.ERROR_REQUIRED_FIELDS
			} else {
				id = parseInt(id)
				const isIdExists = await cityDAO.selectByIdCity(id)

				if (isIdExists !== false && typeof isIdExists === 'object' && isIdExists.length === 1) {
					body.id = id
					const responseDAO = await cityDAO.updateCity(body)

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
	insertCityController,
	selectAllCityController,
	selectByIdCityController,
	deleteCityController,
	updateCityController
}
