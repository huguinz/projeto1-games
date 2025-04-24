/******************************************************************************************
 * Objetivo: Controller responsavel pela regra de negócio do CRUD do estado da empresa
 * Data: 24/04/2025
 * Autor: Hugo Lopes
 * Versão: 1.0
 ******************************************************************************************/

const MESSAGE = require('../../modulo/config.js')
const stateDAO = require('../../model/DAO/estado.js')

const insertStateController = async (body, contentType) => {
	try {
		if (contentType === 'application/json') {
			const validateState = /^[a-zA-Z]+$/
			if (body.uf === undefined || body.uf === null || !String(body.uf) || !validateState.test(body.uf) || body.uf.length !== 2) {
				return MESSAGE.ERROR_REQUIRED_FIELDS
			} else {
				body.uf = body.uf.toUpperCase()
				const responseDAO = await stateDAO.insertState(body)

				return responseDAO ? MESSAGE.SUCCESS_CREATED_ITEM : MESSAGE.ERROR_INTERNAL_SERVER_MODEL
			}
		} else {
			return MESSAGE.ERROR_CONTENT_TYPE
		}
	} catch (error) {
		return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
	}
}

const selectAllStateController = async () => {
	try {
		const responseDAO = await stateDAO.selectAllState()

		if (responseDAO !== false && typeof responseDAO === 'object') {
			if (responseDAO.length < 1) {
				return MESSAGE.ERROR_NOT_FOUND
			} else {
				const data = {}

				data.status = true
				data.status_code = 200
				data.items = responseDAO.length
				data.states = responseDAO

				return data
			}
		} else {
			return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
		}
	} catch (error) {
		return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
	}
}

const selectByIdStateController = async (id) => {
	try {
		const responseDAO = await stateDAO.selectByIdState(id)
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
				data.estado_encontrado = responseDAO

				return data
			}
		} else {
			return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
		}
	} catch (error) {
		return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
	}
}

const deleteStateController = async (id) => {
	try {
		if (id === null || id === undefined || isNaN(id) || id <= 0) {
			return MESSAGE.ERROR_REQUIRED_FIELDS
		} else {
			id = parseInt(id)
			const isIdExists = await stateDAO.selectByIdState(id)

			if (isIdExists !== false && typeof isIdExists === 'object') {
				if (isIdExists.length === 1) {
					const responseDAO = await stateDAO.deleteState(id)

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

const updateStateController = async (body, id, contentType) => {
	try {
		if (contentType === 'application/json') {
			const validateState = /^[a-zA-Z]+$/
			if (
				body.uf === undefined ||
				body.uf === null ||
				!String(body.uf) ||
				!validateState.test(body.uf) ||
				body.uf.length !== 2 ||
				id <= 0 ||
				id === null ||
				id === undefined ||
				isNaN(id)
			) {
				return MESSAGE.ERROR_REQUIRED_FIELDS
			} else {
				id = parseInt(id)
				const isIdExists = await stateDAO.selectByIdState(id)

				if (isIdExists !== false && typeof isIdExists === 'object' && isIdExists.length === 1) {
					body.id = id
					body.uf = body.uf.toUpperCase()
					const responseDAO = await stateDAO.updateState(body)

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
	insertStateController,
	selectAllStateController,
	selectByIdStateController,
	deleteStateController,
	updateStateController
}
