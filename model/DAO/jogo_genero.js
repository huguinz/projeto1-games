/*************************************************************************************************************
 * Objetivo: Model responsável pelo CRUD referente a ligação de dados entre jogos e generos no banco de dados
 * Data: 17/05/2025
 * Autor: Hugo Lopes
 * Versão: 1.0
 *************************************************************************************************************/

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const insertGameAndGenre = async (body) => {
	try {
		const { id_jogo, id_genero } = body
		const sql = `INSERT INTO tbl_jogo_genero (
                                                id_jogo,
                                                id_genero
                                            ) values (
                                                ${id_jogo},
                                                '${id_genero}'
                                            )`
		const result = await prisma.$executeRawUnsafe(sql)

		return result ? result : false
	} catch (error) {
		return false
	}
}

const selectAllGameAndGenre = async () => {
	try {
		const sql = 'SELECT * FROM tbl_jogo_genero ORDER BY ID DESC'
		const result = await prisma.$queryRawUnsafe(sql)

		return result ? result : false
	} catch (error) {
		return false
	}
}

const selectByIdGameAndGenre = async (id) => {
	try {
		const sql = `SELECT * FROM tbl_jogo_genero WHERE ID = ${id}`
		const result = await prisma.$queryRawUnsafe(sql)

		return result ? result : false
	} catch (error) {
		return false
	}
}

const deleteGameAndGenre = async (id) => {
	try {
		const sql = `DELETE FROM tbl_jogo_genero WHERE ID = ${id}`
		const result = await prisma.$executeRawUnsafe(sql)

		return result ? result : false
	} catch (error) {
		return false
	}
}

const updateGameAndGenre = async (body) => {
	try {
		const { id, id_jogo, id_genero } = body
		const sql = `UPDATE tbl_jogo_genero SET
                                            id_jogo = '${id_jogo}',
                                            id_genero = ${id_genero}
                                            WHERE ID = ${id}`
		const result = await prisma.$executeRawUnsafe(sql)

		return result ? result : false
	} catch (error) {
		return false
	}
}

const selectGameByGenre = async (id) => {
	try {
		const sql = `SELECT 
						tj.nome AS nome_jogo,
						tg.nome AS genero,
						tjg.id 
					FROM 
						tbl_jogo_genero AS tjg 
					INNER JOIN
						tbl_jogo AS tj
					ON
						tjg.id_jogo = tj.id
					INNER JOIN 
						tbl_genero AS tg
					ON 
						tjg.id_genero = tg.id WHERE tg.id = ${id}`
		const result = prisma.$queryRawUnsafe(sql)

		return result ? result : false
	} catch (error) {
		return false
	}
}

const selectGenreByGame = async (id) => {
	try {
		const sql = `SELECT 
						tj.nome AS nome_jogo,
						tg.nome AS genero,
						tjg.id 
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
		const result = prisma.$queryRawUnsafe(sql)

		return result ? result : false
	} catch (error) {
		return false
	}
}

module.exports = {
	insertGameAndGenre,
	selectAllGameAndGenre,
	selectByIdGameAndGenre,
	deleteGameAndGenre,
	updateGameAndGenre,
	selectGameByGenre,
	selectGenreByGame
}
