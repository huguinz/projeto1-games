/******************************************************************************************
 * Objetivo: Controller responsavel pela regra de negócio do CRUD da empresa
 * Data: 11/05/2025
 * Autor: Hugo Lopes
 * Versão: 1.0
 ******************************************************************************************/

const MESSAGE = require('../../modulo/config.js')
const enterpriseDAO = require('../../model/DAO/empresa.js')
const tellphoneDAO = require('../../model/DAO/telefone.js')
const controllerTelephone = require('./controllerTelephone.js')

const insertEnterpriseController = async (body, contentType) => {
	try {
		const formatDate = (date) => {
			const inputData = /^\d{4}-\d{2}-\d{2}$/
			const fullDate = new Date(date + 'T12:00:00')

			if (!inputData.test(date) || isNaN(fullDate.getTime())) {
				return false
			} else {
				const year = fullDate.getFullYear()
				const month = fullDate.getMonth() + 1
				const day = fullDate.getDate()

				const data = {
					ano: year,
					mes: month.toString().padStart(2, '0'),
					dia: day.toString().padStart(2, '0')
				}

				const finalDate = `${data.ano}-${data.mes}-${data.dia}`

				return finalDate
			}
		}

		if (contentType === 'application/json') {
			if (
				body.nome === undefined ||
				body.nome === null ||
				body.nome.trim() === '' ||
				body.nome.length > 255 ||
				typeof body.nome !== 'string' ||
				!Array.isArray(body.telefone) ||
				body.site === undefined ||
				body.site === null ||
				body.site.length > 45 ||
				typeof body.site !== 'string' ||
				body.descricao === undefined ||
				body.descricao === null ||
				typeof body.descricao !== 'string' ||
				body.data_fundacao === undefined ||
				body.data_fundacao === null ||
				!formatDate(body.data_fundacao) ||
				body.email_contato === undefined ||
				body.email_contato === null ||
				body.email_contato.length > 255 ||
				typeof body.email_contato !== 'string'
			) {
				return MESSAGE.ERROR_REQUIRED_FIELDS
			} else {
				body.site = body.site.trim() || null
				body.descricao = body.descricao.trim() || null
				body.email_contato = body.email_contato.trim() || null
				body.data_fundacao = formatDate(body.data_fundacao)

				const responseDAO = await enterpriseDAO.insertEnterprise(body)
				if (!body.telefone.length) {
					return MESSAGE.SUCCESS_CREATED_ITEM
				}

				if (responseDAO) {
					const dataInsertNumber = {}

					const getEnterpriseID = await enterpriseDAO.selectLastEnterprise()

					getEnterpriseID.forEach((item) => {
						const idEnterprise = item.id
						dataInsertNumber.telefone = body.telefone
						dataInsertNumber.id_empresa = idEnterprise
					})

					const validateNumber = await controllerTelephone.insertTelephoneController(dataInsertNumber, 'application/json')

					if (validateNumber.status) {
						return MESSAGE.SUCCESS_CREATED_ITEM
					} else {
						return validateNumber
					}
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

const selectAllEnterpriseController = async () => {
	try {
		const responseDAO = await enterpriseDAO.selectAllEnterprise()

		if (responseDAO !== false && typeof responseDAO === 'object') {
			if (responseDAO.length < 1) {
				return MESSAGE.ERROR_NOT_FOUND
			} else {
				const data = {}
				const tellphones = []

				data.status = true
				data.status_code = 200
				data.items = responseDAO.length
				data.enterprises = responseDAO

				for (const tellphone of responseDAO) {
				}
				data.tellphones = tellphones

				return data
			}
		} else {
			return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
		}
	} catch (error) {
		return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
	}
}

const selectByIdEnterpriseController = async (id) => {
	try {
		if (id === null || id === undefined || id <= 0 || isNaN(id)) {
			return MESSAGE.ERROR_REQUIRED_FIELDS
		} else {
			id = parseInt(id)
			const responseDAO = await enterpriseDAO.selectByIdEnterprise(id)

			if (responseDAO !== false && typeof responseDAO === 'object') {
				if (responseDAO.length <= 0) {
					return MESSAGE.ERROR_NOT_FOUND
				} else {
					const data = {}

					data.status = true
					data.status_code = 200
					data.message = 'Operação realizada com sucesso!'
					data.empresa_encontrada = responseDAO

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

const deleteEnterpriseController = async (id) => {
	try {
		if (id === null || id === undefined || isNaN(id) || id <= 0) {
			return MESSAGE.ERROR_REQUIRED_FIELDS
		} else {
			id = parseInt(id)
			const isIdExists = await enterpriseDAO.selectByIdEnterprise(id)

			if (isIdExists !== false && typeof isIdExists === 'object') {
				if (isIdExists.length === 1) {
					const responseDAO = await enterpriseDAO.deleteEnterprise(id)

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

const updateEnterpriseController = async (body, id, contentType) => {
	try {
		const formatDate = (date) => {
			const inputData = /^\d{4}-\d{2}-\d{2}$/
			const fullDate = new Date(date + 'T12:00:00')

			if (!inputData.test(date) || isNaN(fullDate.getTime())) {
				return false
			} else {
				const year = fullDate.getFullYear()
				const month = fullDate.getMonth() + 1
				const day = fullDate.getDate()

				const data = {
					ano: year,
					mes: month.toString().padStart(2, '0'),
					dia: day.toString().padStart(2, '0')
				}

				const finalDate = `${data.ano}-${data.mes}-${data.dia}`

				return finalDate
			}
		}

		if (contentType === 'application/json') {
			if (
				body.nome === undefined ||
				body.nome === null ||
				body.nome.trim() === '' ||
				body.nome.length > 255 ||
				typeof body.nome !== 'string' ||
				body.site === undefined ||
				body.site === null ||
				body.site.length > 45 ||
				body.descricao === undefined ||
				body.descricao === null ||
				body.data_fundacao === undefined ||
				body.data_fundacao === null ||
				!formatDate(body.data_fundacao) ||
				body.email_contato === undefined ||
				body.email_contato === null ||
				body.email_contato.length > 255 ||
				typeof body.email_contato !== 'string' ||
				id <= 0 ||
				id === null ||
				id === undefined ||
				isNaN(id)
			) {
				return MESSAGE.ERROR_REQUIRED_FIELDS
			} else {
				body.site = body.site.trim() || null
				body.descricao = body.descricao.trim() || null
				body.email_contato = body.email_contato.trim() || null
				body.data_fundacao = formatDate(body.data_fundacao)
				id = parseInt(id)

				const isIdExists = await enterpriseDAO.selectByIdEnterprise(id)

				if (isIdExists !== false && typeof isIdExists === 'object' && isIdExists.length === 1) {
					body.id = id
					const responseDAO = await enterpriseDAO.updateEnterprise(body)

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
	insertEnterpriseController,
	selectAllEnterpriseController,
	selectByIdEnterpriseController,
	deleteEnterpriseController,
	updateEnterpriseController
}
