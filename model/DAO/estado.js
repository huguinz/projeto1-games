/***********************************************************************************************************
 * Objetivo: Model responsável pelo CRUD de dados referente ao estado da empresa no Banco de Dados
 * Data: 24/04/2025
 * Autor: Hugo Lopes
 * Versão: 1.0
 ***********************************************************************************************************/

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const insertState = async (body) => {
	try {
		const sql = `INSERT INTO tbl_estado (uf) VALUES ('${body.uf}') `
		const resultDatabase = await prisma.$executeRawUnsafe(sql)

		return resultDatabase ? resultDatabase : false
	} catch (error) {
		return false
	}
}

const selectAllState = async () => {
	try {
		const sql = 'SELECT * FROM tbl_estado'
		const response = await prisma.$queryRawUnsafe(sql)

		return response ? response : false
	} catch (error) {
		return false
	}
}

const selectByIdState = async (id) => {
	try {
		const sql = `SELECT * FROM tbl_estado WHERE ID = ${id}`
		const response = await prisma.$queryRawUnsafe(sql)

		return response ? response : false
	} catch (error) {
		return false
	}
}

const deleteState = async (id) => {
	try {
		const sql = `DELETE FROM tbl_estado WHERE ID = ${id}`
		const response = await prisma.$executeRawUnsafe(sql)

		return response ? response : false
	} catch (error) {
		return false
	}
}

const updateState = async (body) => {
	try {
		const sql = `UPDATE tbl_estado SET
                                            uf = '${body.uf}'
                                            WHERE ID = ${body.id}`
		const response = await prisma.$executeRawUnsafe(sql)

		return response ? response : false
	} catch (error) {
		return false
	}
}

module.exports = {
	insertState,
	selectAllState,
	selectByIdState,
	deleteState,
	updateState
}
