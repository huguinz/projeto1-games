/***********************************************************************************************************
 * Objetivo: Model responsável pelo CRUD de dados referente ao telefone da empresa no banco de dados
 * Data: 11/05/2025
 * Autor: Hugo Lopes
 * Versão: 1.0
 ***********************************************************************************************************/

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const insertTelephone = async (body) => {
	try {
		const sql = `INSERT INTO tbl_telefone (
                                                telefone,
                                                id_empresa

                                            ) values (
                                                '${body.telefone}',
                                                '${body.id_empresa}'
                                            )`
		const result = await prisma.$executeRawUnsafe(sql)

		return result ? result : false
	} catch (error) {
		return false
	}
}

const selectAllTelephone = async () => {
	try {
		const sql = 'SELECT * FROM tbl_telefone ORDER BY ID DESC'
		const result = await prisma.$queryRawUnsafe(sql)

		return result ? result : false
	} catch (error) {
		return false
	}
}

const selectByIdTelephone = async (id) => {
	try {
		const sql = `SELECT * FROM tbl_telefone WHERE ID = ${id}`
		const result = await prisma.$queryRawUnsafe(sql)

		return result ? result : false
	} catch (error) {
		return false
	}
}

const deleteTelephone = async (id) => {
	try {
		const sql = `DELETE FROM tbl_telefone WHERE ID = ${id}`
		const result = await prisma.$executeRawUnsafe(sql)

		return result ? result : false
	} catch (error) {
		return false
	}
}

const updateTelephone = async (body) => {
	try {
		const sql = `UPDATE tbl_telefone SET
											telefone = '${body.telefone}',
                                            id_empresa = ${body.id_empresa}
                                            WHERE ID = ${body.id}`
		const result = await prisma.$executeRawUnsafe(sql)

		return result ? result : false
	} catch (error) {
		return false
	}
}

module.exports = {
	insertTelephone,
	selectAllTelephone,
	selectByIdTelephone,
	deleteTelephone,
	updateTelephone
}
