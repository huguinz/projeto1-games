/******************************************************************************************
 * Objetivo: Controller responsavel pela regra de negócio do CRUD do país da empresa
 * Data: 24/04/2025
 * Autor: Hugo Lopes
 * Versão: 1.0
 ******************************************************************************************/

const MESSAGE = require('../../modulo/config.js')
const countryDAO = require('../../model/DAO/pais.js')

const insertCountryController = async (body, contentType) => {
	try {
		if (contentType === 'application/json') {
			const validateCountry = /\d/
			if (body.pais === undefined || body.pais === null || !String(body.pais) || validateCountry.test(body.pais) || body.pais.length > 30) {
				return MESSAGE.ERROR_REQUIRED_FIELDS
			} else {
				body.pais = body.pais.toUpperCase()
				const responseDAO = await countryDAO.insertCountry(body)

				return responseDAO ? MESSAGE.SUCCESS_CREATED_ITEM : MESSAGE.ERROR_INTERNAL_SERVER_MODEL
			}
		} else {
			return MESSAGE.ERROR_CONTENT_TYPE
		}
	} catch (error) {
		return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
	}
}

const selectAllCountryController = async () => {
	try {
		const responseDAO = await countryDAO.selectAllCountry()

		if (responseDAO !== false && typeof responseDAO === 'object') {
			if (responseDAO.length < 1) {
				return MESSAGE.ERROR_NOT_FOUND
			} else {
				const data = {}

				data.status = true
				data.status_code = 200
				data.items = responseDAO.length
				data.countries = responseDAO

				return data
			}
		} else {
			return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
		}
	} catch (error) {
		return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
	}
}

const selectByIdCountryController = async (id) => {
	try {
		const responseDAO = await countryDAO.selectByIdCountry(id)
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

const deleteCountryController = async (id) => {
	try {
		if (id === null || id === undefined || isNaN(id) || id <= 0) {
			return MESSAGE.ERROR_REQUIRED_FIELDS
		} else {
			id = parseInt(id)
			const isIdExists = await countryDAO.selectByIdCountry(id)

			if (isIdExists !== false && typeof isIdExists === 'object') {
				if (isIdExists.length === 1) {
					const responseDAO = await countryDAO.deleteCountry(id)

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

const updateCountryController = async (body, id, contentType) => {
	try {
		if (contentType === 'application/json') {
			const validateState = /\d/
			if (
				body.pais === undefined ||
				body.pais === null ||
				!String(body.pais) ||
				validateState.test(body.pais) ||
				body.pais.length > 30 ||
				id <= 0 ||
				id === null ||
				id === undefined ||
				isNaN(id)
			) {
				return MESSAGE.ERROR_REQUIRED_FIELDS
			} else {
				id = parseInt(id)
				const isIdExists = await countryDAO.selectByIdCountry(id)

				if (isIdExists !== false && typeof isIdExists === 'object' && isIdExists.length === 1) {
					body.id = id
					body.pais = body.pais.toUpperCase()
					const responseDAO = await countryDAO.updateCountry(body)

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
	insertCountryController,
	selectAllCountryController,
	selectByIdCountryController,
	deleteCountryController,
	updateCountryController
}
