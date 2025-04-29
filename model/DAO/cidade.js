/***********************************************************************************************************
 * Objetivo: Model responsável pelo CRUD de dados referente a plataforma do jogo no Banco de Dados
 * Data: 29/04/2025
 * Autor: Hugo Lopes
 * Versão: 1.0
 ***********************************************************************************************************/

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const insertCity = async (body) => {
	try {
		const sql = `INSERT INTO tbl_cidade (pais) VALUES ('${body.cidade}') `
		const resultDatabase = await prisma.$executeRawUnsafe(sql)

		return resultDatabase ? resultDatabase : false
	} catch (error) {
		return false
	}
}

const selectAllCity = async () => {
	try {
		const sql = 'SELECT * FROM tbl_cidade'
		const response = await prisma.$queryRawUnsafe(sql)

		return response ? response : false
	} catch (error) {
		return false
	}
}

const selectByIdCity = async (id) => {
	try {
		const sql = `SELECT * FROM tbl_cidade WHERE ID = ${id}`
		const response = await prisma.$queryRawUnsafe(sql)

		return response ? response : false
	} catch (error) {
		return false
	}
}

const deleteCity = async (id) => {
	try {
		const sql = `DELETE FROM tbl_cidade WHERE ID = ${id}`
		const response = await prisma.$executeRawUnsafe(sql)

		return response ? response : false
	} catch (error) {
		return false
	}
}

const updateCity = async (body) => {
	try {
		const sql = `UPDATE tbl_cidade SET
                                            pais = '${body.cidade}'
                                            WHERE ID = ${body.id}`
		const response = await prisma.$executeRawUnsafe(sql)

		return response ? response : false
	} catch (error) {
		return false
	}
}

module.exports = {
	insertCity,
	selectAllCity,
	selectByIdCity,
	deleteCity,
	updateCity
}
