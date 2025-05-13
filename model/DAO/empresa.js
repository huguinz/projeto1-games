/***********************************************************************************************************
 * Objetivo: Model responsável pelo CRUD de dados referente as empresas no banco de dados
 * Data: 11/05/2025
 * Autor: Hugo Lopes
 * Versão: 1.0
 ***********************************************************************************************************/

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const insertEnterprise = async (body) => {
	try {
		const sql = `INSERT INTO tbl_empresa (
                                                nome,
                                                site,
                                                descricao,
                                                data_fundacao,
                                                email_contato

                                            ) values (
                                                '${body.nome}',
                                                '${body.site}',
                                                '${body.descricao}',
                                                '${body.data_fundacao}',
                                                '${body.email_contato}'
                                            )`
		const result = await prisma.$executeRawUnsafe(sql)

		return result ? result : false
	} catch (error) {
		return false
	}
}

const selectAllEnterprise = async () => {
	try {
		const sql = 'SELECT * FROM tbl_empresa ORDER BY ID DESC'
		const result = await prisma.$queryRawUnsafe(sql)

		return result ? result : false
	} catch (error) {
		return false
	}
}

const selectByIdEnterprise = async (id) => {
	try {
		const sql = `SELECT * FROM tbl_empresa WHERE ID = ${id}`
		const result = await prisma.$queryRawUnsafe(sql)

		return result ? result : false
	} catch (error) {
		return false
	}
}

const deleteEnterprise = async (id) => {
	try {
		const sql = `DELETE FROM tbl_empresa WHERE ID = ${id}`
		const result = await prisma.$executeRawUnsafe(sql)

		return result ? result : false
	} catch (error) {
		return false
	}
}

const updateEnterprise = async (body) => {
	try {
		const sql = `UPDATE tbl_empresa SET
                                            nome = '${body.nome}',
                                            site = '${body.site}',
                                            descricao = '${body.descricao}',
                                            data_fundacao = '${body.data_fundacao}',
                                            email_contato = '${body.email_contato}'
                                            WHERE ID = ${body.id}`
		const result = await prisma.$executeRawUnsafe(sql)

		return result ? result : false
	} catch (error) {
		return false
	}
}

const selectLastEnterprise = async () => {
	try {
		const sql = 'SELECT * FROM tbl_empresa ORDER BY ID DESC LIMIT 1'
		const result = await prisma.$queryRawUnsafe(sql)

		return result ? result : false
	} catch (error) {
		return false
	}
}

module.exports = {
	insertEnterprise,
	selectAllEnterprise,
	selectByIdEnterprise,
	deleteEnterprise,
	updateEnterprise,
	selectLastEnterprise
}
