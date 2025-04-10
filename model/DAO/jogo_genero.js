/**********************************************************************************************
 * Objetivo: Model responsável pelo CRUD de dados referente ao gênero do jogo no Banco de Dados
 * Data: 03/04/2025
 * Autor: Hugo Lopes
 * Versão: 1.0
 **********************************************************************************************/

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const insertGameGenre = async (gameGenre) => {
	try {
		const sql = `INSERT INTO tbl_genero (nome) values ('${gameGenre.nome}')`
		const result = await prisma.$executeRawUnsafe(sql)

		if (result) {
			return true
		} else {
			return false
		}
	} catch (error) {
		console.log(error)
		return false
	}
}

const selectAllGameGenre = async () => {
	try {
		let sql = 'SELECT * FROM tbl_genero ORDER BY ID DESC'
		let result = await prisma.$queryRawUnsafe(sql)

		return result ? result : false
	} catch (error) {
		console.log(error)
		return false
	}
}

const selectByIdGameGenre = async (id) => {
	try {
		let sql = `SELECT * FROM tbl_genero WHERE ID = ${id}`
		let result = await prisma.$queryRawUnsafe(sql)

		return result ? result : false
	} catch (error) {
		console.log(error)
		return false
	}
}

module.exports = {
	insertGameGenre,
	selectAllGameGenre,
	selectByIdGameGenre
}
