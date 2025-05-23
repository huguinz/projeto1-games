/**********************************************************************************************
 * Objetivo: Model responsável pelo CRUD de dados referente ao gênero do jogo no Banco de Dados
 * Data: 03/04/2025
 * Autor: Hugo Lopes
 * Versão: 1.0
 **********************************************************************************************/

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const insertGenre = async (gameGenre) => {
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

const selectAllGenre = async () => {
	try {
		let sql = 'SELECT * FROM tbl_genero ORDER BY ID DESC'
		let result = await prisma.$queryRawUnsafe(sql)

		return result ? result : false
	} catch (error) {
		console.log(error)
		return false
	}
}

const selectByIdGenre = async (id) => {
	try {
		let sql = `SELECT * FROM tbl_genero WHERE ID = ${id}`
		let result = await prisma.$queryRawUnsafe(sql)

		return result ? result : false
	} catch (error) {
		return false
	}
}

const selectByGenreName = async (name) => {
	try {
		const sql = `SELECT * FROM tbl_genero WHERE nome = '${name}'`
		const result = await prisma.$queryRawUnsafe(sql)

		return result ? result : false
	} catch (error) {
		return false
	}
}

const deleteGenre = async (id) => {
	try {
		let sql = `DELETE FROM tbl_genero WHERE ID = ${id}`
		let result = await prisma.$executeRawUnsafe(sql)

		return result ? result : false
	} catch (error) {
		return false
	}
}

const updateGenre = async (gameGenre) => {
	try {
		let sql = `UPDATE tbl_genero SET nome = '${gameGenre.nome}' WHERE ID = ${gameGenre.id}`
		let result = await prisma.$executeRawUnsafe(sql)

		return result ? result : false
	} catch (error) {
		return false
	}
}

const selectGenreByGame = async (id) => {
	try {
		const sql = `SELECT 
						tj.nome AS nome_jogo,
						tg.id,
						tjg.id AS id_jogo_genero,
    					tg.nome AS genero
					FROM 
						tbl_jogo_genero AS tjg 
					INNER JOIN
						tbl_jogo AS tj
					ON
						tjg.id_jogo = tj.id
					INNER JOIN 
						tbl_genero AS tg
					ON 
						tjg.id_genero = tg.id WHERE tj.id = ${id}`

		const result = await prisma.$queryRawUnsafe(sql)

		return result ? result : false
	} catch (error) {
		return false
	}
}

module.exports = {
	insertGenre,
	selectAllGenre,
	selectByIdGenre,
	selectByGenreName,
	deleteGenre,
	updateGenre,
	selectGenreByGame
}
