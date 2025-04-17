/***********************************************************************************************************
 * Objetivo: Model responsável pelo CRUD de dados referente a plataforma do jogo no Banco de Dados
 * Data: 17/04/2025
 * Autor: Hugo Lopes
 * Versão: 1.0
 ***********************************************************************************************************/

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const insertPlatform = async (platform) => {
	try {
		const sql = `INSERT INTO tbl_plataforma (nome, ano_lancamento) values (
                                                                                '${platform.nome}',
                                                                                '${platform.ano_lancamento}'
                                                                                )`
		const result = await prisma.$executeRawUnsafe(sql)

		return result ? result : false
	} catch (error) {
		console.log(error)
		return false
	}
}

const selectAllPlatform = async () => {
	try {
		const sql = 'SELECT * FROM tbl_plataforma ORDER BY ID DESC'
		const result = await prisma.$queryRawUnsafe(sql)

		return result ? result : false
	} catch (error) {
		return false
	}
}

module.exports = {
	insertPlatform,
	selectAllPlatform
}
