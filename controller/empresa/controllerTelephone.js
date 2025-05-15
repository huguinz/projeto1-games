/******************************************************************************************
 * Objetivo: Controller responsavel pela regra de negócio do CRUD do telefone da empresa
 * Data: 11/05/2025
 * Autor: Hugo Lopes
 * Versão: 1.0
 ******************************************************************************************/

const MESSAGE = require('../../modulo/config.js')
const telephoneDAO = require('../../model/DAO/telefone.js')
const enterpriseDAO = require('../../model/DAO/empresa.js')

const insertTelephoneController = async (body, contentType) => {
	try {
		if (contentType === 'application/json') {
			const validateNumber = /^[\d-]+$/

			if (
				body.telefone === undefined ||
				body.telefone === null ||
				!Array.isArray(body.telefone) ||
				body.telefone.length < 1 ||
				body.id_empresa === undefined ||
				body.id_empresa === null ||
				body.id_empresa <= 0 ||
				isNaN(body.id_empresa)
			) {
				return MESSAGE.ERROR_REQUIRED_FIELDS
			} else {
				const validateEnterpriseID = await enterpriseDAO.selectByIdEnterprise(body.id_empresa)

				if (validateEnterpriseID.length < 1) {
					return MESSAGE.ERROR_NOT_FOUND
				} else {
					for (const telephones of body.telefone) {
						if (typeof telephones !== 'string' || telephones.length > 30 || !validateNumber.test(telephones)) {
							return MESSAGE.ERROR_REQUIRED_FIELDS
						} else {
							body.telefone = telephones
							const responseTelephoneDAO = await telephoneDAO.insertTelephone(body)

							if (!responseTelephoneDAO) return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
						}
					}

					return MESSAGE.SUCCESS_CREATED_ITEM
				}
			}
		} else {
			return MESSAGE.ERROR_CONTENT_TYPE
		}
	} catch (error) {
		return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
	}
}

const selectAllTelephoneController = async () => {
	try {
		const responseDAO = await telephoneDAO.selectAllTelephone()

		if (responseDAO !== false && typeof responseDAO === 'object') {
			if (responseDAO.length < 1) {
				return MESSAGE.ERROR_NOT_FOUND
			} else {
				const data = {}
				const telephones = []

				data.status = true
				data.status_code = 200
				data.items = responseDAO.length

				for (const index of responseDAO) {
					const enterpriseData = await enterpriseDAO.selectByIdEnterprise(index.id_empresa)

					index.enterprise = enterpriseData
					delete index.id_empresa

					telephones.push(index)
				}

				data.telephones = telephones

				return data
			}
		} else {
			return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
		}
	} catch (error) {
		return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
	}
}

const selectByIdTelephoneController = async (id) => {
	try {
		if (id === null || id === undefined || id <= 0 || isNaN(id)) {
			return MESSAGE.ERROR_REQUIRED_FIELDS
		} else {
			id = parseInt(id)
			const responseDAO = await telephoneDAO.selectByIdTelephone(id)

			if (responseDAO !== false && typeof responseDAO === 'object') {
				if (responseDAO.length <= 0) {
					return MESSAGE.ERROR_NOT_FOUND
				} else {
					const data = {}
					const telephones = []

					data.status = true
					data.status_code = 200
					data.message = 'Operação realizada com sucesso!'
					data.telefone = responseDAO

					for (const index of responseDAO) {
						const enterpriseData = await enterpriseDAO.selectByIdEnterprise(index.id_empresa)

						index.enterprise = enterpriseData
						delete index.id_empresa

						telephones.push(index)
					}

					return data
				}
			} else {
				return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
			}
		}
	} catch (error) {
		return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
	}
}

const deleteTelephoneController = async (id) => {
	try {
		if (id === null || id === undefined || isNaN(id) || id <= 0) {
			return MESSAGE.ERROR_REQUIRED_FIELDS
		} else {
			id = parseInt(id)
			const isIdExists = await telephoneDAO.selectByIdTelephone(id)

			if (isIdExists !== false && typeof isIdExists === 'object') {
				if (isIdExists.length === 1) {
					const responseDAO = await telephoneDAO.deleteTelephone(id)

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

const updateTelephoneController = async (body, id, contentType) => {
	try {
		if (contentType === 'application/json') {
			const validateNumber = /^[\d-]+$/

			if (
				body.telefone === undefined ||
				body.telefone === null ||
				!validateNumber.test(body.telefone) ||
				body.telefone.length > 30 ||
				typeof body.telefone !== 'string' ||
				body.id_empresa === undefined ||
				body.id_empresa === null ||
				body.id_empresa <= 0 ||
				isNaN(body.id_empresa) ||
				id === undefined ||
				id === null ||
				id <= 0 ||
				isNaN(id)
			) {
				return MESSAGE.ERROR_REQUIRED_FIELDS
			} else {
				const isIdExists = await telephoneDAO.selectByIdTelephone(id)

				if (isIdExists !== false && typeof isIdExists === 'object' && isIdExists.length === 1) {
					const validateEnterpriseID = await enterpriseDAO.selectByIdEnterprise(body.id_empresa)

					if (validateEnterpriseID.length < 1) {
						return MESSAGE.ERROR_NOT_FOUND
					} else {
						body.id = id
						const responseTelephoneDAO = await telephoneDAO.updateTelephone(body)

						return responseTelephoneDAO ? MESSAGE.SUCCESS_UPDATED_ITEM : MESSAGE.ERROR_INTERNAL_SERVER_MODEL
					}
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
	insertTelephoneController,
	selectAllTelephoneController,
	selectByIdTelephoneController,
	deleteTelephoneController,
	updateTelephoneController
}
