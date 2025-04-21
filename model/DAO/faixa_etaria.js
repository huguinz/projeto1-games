/****************************************************************************************************
 * Objetivo: Model responsável pelo CRUD de dados referente a faixa etária do jogo no Banco de Dados
 * Data: 18/04/2025
 * Autor: Hugo Lopes
 * Versão: 1.0
 ****************************************************************************************************/

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const insertAgeGroup = async (body) => {
	try {
		const sql = `INSERT INTO tbl_faixa_etaria (classificacao) VALUES ('${body.classificacao}')`
		const response = await prisma.$executeRawUnsafe(sql)

		return response ? response : false
	} catch (error) {
		return false
	}
}

const selectAllAgeGroup = async () => {
	try {
		const sql = 'SELECT * FROM tbl_faixa_etaria'
		const response = await prisma.$queryRawUnsafe(sql)

		return response ? response : false
	} catch (error) {
		return false
	}
}

const selectByIdAgeGroup = async (id) => {
	try {
		const sql = `SELECT * FROM tbl_faixa_etaria WHERE ID = ${id}`
		const response = await prisma.$queryRawUnsafe(sql)

		return response ? response : false
	} catch (error) {
		return false
	}
}

const deleteAgeGroup = async (id) => {
	try {
		const sql = `DELETE FROM tbl_faixa_etaria WHERE ID = ${id}`
		const response = await prisma.$executeRawUnsafe(sql)

		return response ? response : false
	} catch (error) {
		return false
	}
}

const updateAgeGroup = async (body) => {
	try {
		const sql = `UPDATE tbl_faixa_etaria SET
											classificacao = '${body.classificacao}'
											WHERE ID = ${body.id}`
		const response = await prisma.$executeRawUnsafe(sql)

		return response ? response : false
	} catch (error) {
		return false
	}
}

module.exports = {
	insertAgeGroup,
	selectAllAgeGroup,
	selectByIdAgeGroup,
	deleteAgeGroup,
	updateAgeGroup
}
