/******************************************************************************************
 * Objetivo: Controller responsavel pela regra de negócio do CRUD da tabela jogo_genero
 * Data: 17/05/2025
 * Autor: Hugo Lopes
 * Versão: 1.0
 ******************************************************************************************/

const MESSAGE = require('../../modulo/config.js')
const gameAndGenreDAO = require('../../model/DAO/jogo_genero.js')
const gameDAO = require('../../model/DAO/jogo.js')
const genreDAO = require('../../model/DAO/genero.js')

const insertGameAndGenreController = async (body, contentType) => {
	try {
		if (contentType === 'application/json') {
			const { id_jogo, genero } = body

			if (
				id_jogo === undefined ||
				id_jogo === null ||
				id_jogo < 1 ||
				isNaN(id_jogo) ||
				genero === undefined ||
				genero === null ||
				genero.length < 1 ||
				!Array.isArray(genero)
			) {
				return MESSAGE.ERROR_REQUIRED_FIELDS
			} else {
				const validateGameID = await gameDAO.selectByIdJogo(id_jogo)

				if (validateGameID.length < 1) {
					return MESSAGE.ERROR_NOT_FOUND
				} else {
					const allowedGenres = []

					for (let genre of genero) {
						genre = genre.toUpperCase()
						const getGenre = await genreDAO.selectByGenreName(genre)

						getGenre.forEach((item) => {
							allowedGenres.push(item)
						})
					}

					for (const insertGenres of allowedGenres) {
						const data = {
							id_jogo: id_jogo,
							id_genero: insertGenres.id
						}

						const responseDAO = await gameAndGenreDAO.insertGameAndGenre(data)

						if (!responseDAO) {
							return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
						}
					}

					return MESSAGE.SUCCESS_CREATED_ITEM
				}
			}
		} else {
			return MESSAGE.ERROR_CONTENT_TYPE
		}
	} catch (error) {
		return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
	}
}

const selectAllGameAndGenreController = async () => {
	try {
		const responseDAO = await gameAndGenreDAO.selectAllGameAndGenre()

		if (responseDAO !== false && typeof responseDAO === 'object') {
			if (responseDAO.length < 1) {
				return MESSAGE.ERROR_NOT_FOUND
			} else {
				const data = {}

				data.status = true
				data.status_code = 200
				data.items = responseDAO.length
				data.games = responseDAO

				return data
			}
		} else {
			return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
		}
	} catch (error) {
		return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
	}
}

const selectByIdGameAndGenreController = async (id) => {
	try {
		if (id === null || id === undefined || id <= 0 || isNaN(id)) {
			return MESSAGE.ERROR_REQUIRED_FIELDS
		} else {
			id = parseInt(id)
			const responseDAO = await gameAndGenreDAO.selectByIdGameAndGenre(id)

			if (responseDAO !== false && typeof responseDAO === 'object') {
				if (responseDAO.length <= 0) {
					return MESSAGE.ERROR_NOT_FOUND
				} else {
					const data = {}

					data.status = true
					data.status_code = 200
					data.message = 'Operação realizada com sucesso!'
					data.telefone = responseDAO

					return data
				}
			} else {
				return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
			}
		}
	} catch (error) {
		return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
	}
}

const deleteGameAndGenreController = async (id) => {
	try {
		if (id === null || id === undefined || isNaN(id) || id <= 0) {
			return MESSAGE.ERROR_REQUIRED_FIELDS
		} else {
			id = parseInt(id)
			const isIdExists = await gameAndGenreDAO.selectByIdGameAndGenre(id)

			if (isIdExists !== false && typeof isIdExists === 'object') {
				if (isIdExists.length === 1) {
					const responseDAO = await gameAndGenreDAO.deleteGameAndGenre(id)

					return responseDAO ? MESSAGE.SUCCESS_DELETED_ITEM : MESSAGE.ERROR_INTERNAL_SERVER_MODEL
				} else {
					return MESSAGE.ERROR_NOT_FOUND
				}
			} else {
				return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
			}
		}
	} catch (error) {
		return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
	}
}

const updateGameAndGenreController = async (body, id, contentType) => {
	try {
		if (contentType === 'application/json') {
			const { id_jogo, id_genero } = body

			if (
				id_jogo === undefined ||
				id_jogo === null ||
				id_jogo < 1 ||
				isNaN(id_jogo) ||
				id_genero === undefined ||
				id_genero === null ||
				id_genero < 1 ||
				isNaN(id_genero)
			) {
				return MESSAGE.ERROR_REQUIRED_FIELDS
			} else {
				const isIdExists = await gameAndGenreDAO.selectByIdGameAndGenre(id)

				if (isIdExists !== false && typeof isIdExists === 'object' && isIdExists.length === 1) {
					const validateGameID = await gameDAO.selectByIdJogo(id_jogo)
					const validateGenreID = await genreDAO.selectByIdGenre(id_genero)

					if (validateGameID.length < 1 || validateGenreID.length < 1) {
						return MESSAGE.ERROR_NOT_FOUND
					} else {
						body.id = id
						const responseDAO = await gameAndGenreDAO.updateGameAndGenre(body)

						if (!responseDAO) return MESSAGE.ERROR_INTERNAL_SERVER_MODEL

						return MESSAGE.SUCCESS_UPDATED_ITEM
					}
				} else if (isIdExists.length < 1) {
					return MESSAGE.ERROR_NOT_FOUND
				} else {
					return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
				}
			}
		} else {
			return MESSAGE.ERROR_CONTENT_TYPE
		}
	} catch (error) {
		return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
	}
}

const selectGameByGenreController = async (id) => {
	try {
		if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
			return MESSAGE.ERROR_REQUIRED_FIELDS
		} else {
			id = parseInt(id)
			const data = {}

			let responseDAO = await gameAndGenreDAO.selectGameByGenre(id)

			if (responseDAO != false || typeof responseDAO == 'object') {
				if (responseDAO.length > 0) {
					const genreName = {}

					responseDAO.forEach((item) => {
						genreName.selectedGenre = item.genero
						delete item.genero
					})

					data.status = true
					data.status_code = 200
					data.selectedGenre = genreName.selectedGenre
					data.games = responseDAO

					return data
				} else {
					return MESSAGE.ERROR_NOT_FOUND
				}
			} else {
				return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
			}
		}
	} catch (error) {
		return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
	}
}

const selectGenreByGameController = async (id) => {
	try {
		if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
			return MESSAGE.ERROR_REQUIRED_FIELDS
		} else {
			id = parseInt(id)
			const data = {}

			let responseDAO = await gameAndGenreDAO.selectGenreByGame(id)

			if (responseDAO != false || typeof responseDAO == 'object') {
				if (responseDAO.length > 0) {
					const gameName = {}

					responseDAO.forEach((item) => {
						gameName.selectedGame = item.nome_jogo
						delete item.nome_jogo
					})

					data.status = true
					data.status_code = 200
					data.selectedGame = gameName.selectedGame
					data.games = responseDAO

					return data
				} else {
					return MESSAGE.ERROR_NOT_FOUND
				}
			} else {
				return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
			}
		}
	} catch (error) {
		return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
	}
}

module.exports = {
	insertGameAndGenreController,
	selectAllGameAndGenreController,
	selectByIdGameAndGenreController,
	deleteGameAndGenreController,
	updateGameAndGenreController,
	selectGameByGenreController,
	selectGenreByGameController
}
