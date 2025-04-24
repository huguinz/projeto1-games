/***********************************************************************************************************
 * Objetivo: Model responsável pelo CRUD de dados referente ao pais da empresa no Banco de Dados
 * Data: 24/04/2025
 * Autor: Hugo Lopes
 * Versão: 1.0
 ***********************************************************************************************************/

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const insertCountry = async (body) => {
	try {
		const sql = `INSERT INTO tbl_pais (pais) VALUES ('${body.pais}') `
		const resultDatabase = await prisma.$executeRawUnsafe(sql)

		return resultDatabase ? resultDatabase : false
	} catch (error) {
		return false
	}
}

const selectAllCountry = async () => {
	try {
		const sql = 'SELECT * FROM tbl_pais'
		const response = await prisma.$queryRawUnsafe(sql)

		return response ? response : false
	} catch (error) {
		return false
	}
}

const selectByIdCountry = async (id) => {
	try {
		const sql = `SELECT * FROM tbl_pais WHERE ID = ${id}`
		const response = await prisma.$queryRawUnsafe(sql)

		return response ? response : false
	} catch (error) {
		return false
	}
}

const deleteCountry = async (id) => {
	try {
		const sql = `DELETE FROM tbl_pais WHERE ID = ${id}`
		const response = await prisma.$executeRawUnsafe(sql)

		return response ? response : false
	} catch (error) {
		return false
	}
}

const updateCountry = async (body) => {
	try {
		const sql = `UPDATE tbl_pais SET
                                            pais = '${body.pais}'
                                            WHERE ID = ${body.id}`
		const response = await prisma.$executeRawUnsafe(sql)

		return response ? response : false
	} catch (error) {
		return false
	}
}

module.exports = {
	insertCountry,
	selectAllCountry,
	selectByIdCountry,
	deleteCountry,
	updateCountry
}
