/*************************************************************************************************************
 * Objetivo: Model responsável pelo CRUD referente a ligação de dados entre jogos e as empresas no banco de dados
 * Data: 19/05/2025
 * Autor: Hugo Lopes
 * Versão: 1.0
 *************************************************************************************************************/

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const insertGameAndEnterprise = async (body) => {
	try {
		const { id_jogo, id_empresa } = body
		const sql = `INSERT INTO tbl_jogo_empresa (
                                                id_jogo,
                                                id_empresa
                                            ) values (
                                                ${id_jogo},
                                                '${id_empresa}'
                                            )`
		const result = await prisma.$executeRawUnsafe(sql)

		return result ? result : false
	} catch (error) {
		return false
	}
}

const selectAllGameAndEnterprise = async () => {
	try {
		const sql = 'SELECT * FROM tbl_jogo_empresa ORDER BY ID DESC'
		const result = await prisma.$queryRawUnsafe(sql)

		return result ? result : false
	} catch (error) {
		return false
	}
}

const selectByIdGameAndEnterprise = async (id) => {
	try {
		const sql = `SELECT * FROM tbl_jogo_empresa WHERE ID = ${id}`
		const result = await prisma.$queryRawUnsafe(sql)

		return result ? result : false
	} catch (error) {
		return false
	}
}

const deleteGameAndEnterprise = async (id) => {
	try {
		const sql = `DELETE FROM tbl_jogo_empresa WHERE ID = ${id}`
		const result = await prisma.$executeRawUnsafe(sql)

		return result ? result : false
	} catch (error) {
		return false
	}
}

const updateGameAndEnterprise = async (body) => {
	try {
		const { id, id_jogo, id_empresa } = body
		const sql = `UPDATE tbl_jogo_empresa SET
                                            id_jogo = '${id_jogo}',
                                            id_empresa = ${id_empresa}
                                            WHERE ID = ${id}`
		const result = await prisma.$executeRawUnsafe(sql)

		return result ? result : false
	} catch (error) {
		return false
	}
}

const selectGameByEnterprise = async (id) => {
	try {
		const sql = `SELECT 
                        tj.nome AS nome_jogo,
                        te.nome AS empresa,
                        tje.id 
                    FROM 
                        tbl_jogo_empresa AS tje
                    INNER JOIN
                        tbl_jogo AS tj
                    ON
                        tje.id_jogo = tj.id
                    INNER JOIN 
                        tbl_empresa AS te
                    ON 
                        tje.id_empresa = te.id WHERE te.id = ${id}`
		const result = prisma.$queryRawUnsafe(sql)

		return result ? result : false
	} catch (error) {
		return false
	}
}

const selectEnterpriseByGame = async (id) => {
	try {
		const sql = `SELECT 
                        tj.nome AS nome_jogo,
                        te.nome AS empresa,
                        tje.id 
                    FROM 
                        tbl_jogo_empresa AS tje
                    INNER JOIN
                        tbl_jogo AS tj
                    ON
                        tje.id_jogo = tj.id
                    INNER JOIN 
                        tbl_empresa AS te
                    ON 
                        tje.id_empresa = te.id WHERE tj.id = ${id};`
		const result = prisma.$queryRawUnsafe(sql)

		return result ? result : false
	} catch (error) {
		return false
	}
}

module.exports = {
	insertGameAndEnterprise,
	selectAllGameAndEnterprise,
	selectByIdGameAndEnterprise,
	deleteGameAndEnterprise,
	updateGameAndEnterprise,
	selectGameByEnterprise,
	selectEnterpriseByGame
}
