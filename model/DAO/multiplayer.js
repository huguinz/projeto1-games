/***********************************************************************************************************
 * Objetivo: Model responsável pelo CRUD de dados referente ao modos de jogo (multiplayer) no Banco de Dados
 * Data: 17/04/2025
 * Autor: Hugo Lopes
 * Versão: 1.0
 ***********************************************************************************************************/

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const insertMultiplayer = async (multiplayer) => {
	try {
		const sql = `INSERT INTO tbl_multiplayer (modo_jogo) values ('${multiplayer.modo_jogo}')`
		const result = await prisma.$executeRawUnsafe(sql)

		return result ? result : false
	} catch (error) {
		console.log(error)
		return false
	}
}

const selectAllMultiplayer = async () => {
	try {
		const sql = 'SELECT * FROM tbl_multiplayer ORDER BY ID DESC'
		const result = await prisma.$queryRawUnsafe(sql)

		return result ? result : false
	} catch (error) {
		console.log(error)
		return false
	}
}

const selectByIdMultiplayer = async (id) => {
	try {
		const sql = `SELECT * FROM tbl_multiplayer WHERE ID = ${id}`
		const result = await prisma.$queryRawUnsafe(sql)

		return result ? result : false
	} catch (error) {
		console.log(error)
		return false
	}
}

const deleteMultiplayer = async (id) => {
	try {
		let sql = `DELETE FROM tbl_multiplayer WHERE ID = ${id}`
		let result = await prisma.$executeRawUnsafe(sql)

		return result ? result : false
	} catch (error) {
		console.log(error)
		return false
	}
}

const updateMultiplayer = async (gameMultiplayer) => {
	try {
		const sql = `UPDATE tbl_multiplayer SET modo_jogo = '${gameMultiplayer.modo_jogo}' WHERE ID = ${gameMultiplayer.id}`
		const result = await prisma.$executeRawUnsafe(sql)

		return result ? result : false
	} catch (error) {
		console.log(error)
		return false
	}
}

module.exports = {
	insertMultiplayer,
	selectAllMultiplayer,
	selectByIdMultiplayer,
	deleteMultiplayer,
	updateMultiplayer
}
