/************************************************************************************
 * Objetivo: Controller responsavel pela regra de negócio do CRUD do jogo
 * Data: 13/02/2025
 * Autor: Hugo Lopes
 * Versão: 1.0
 ***********************************************************************************/

//Import do arquivo de configuração para mensagens e status code
const MESSAGE = require('../../modulo/config.js')

//Import do DAO para realizar o CRUD no BD
const jogoDAO = require('../../model/DAO/jogo.js')
const generoDAO = require('../../model/DAO/genero.js')
const jogoGeneroController = require('./controllerJogoGenero.js')

//Funçao para atualizar jogo
const atualizarJogo = async (jogo, id, contentType) => {
	try {
		if (contentType == 'application/json') {
			if (
				jogo.nome == undefined ||
				jogo.nome == '' ||
				jogo.nome == null ||
				jogo.nome.length > 80 ||
				jogo.data_lancamento == undefined ||
				jogo.data_lancamento == '' ||
				jogo.data_lancamento == null ||
				jogo.data_lancamento.length > 10 ||
				jogo.versao == undefined ||
				jogo.versao == '' ||
				jogo.versao == null ||
				jogo.versao.length > 10 ||
				jogo.tamanho == undefined ||
				jogo.tamanho.length > 10 ||
				jogo.descricao == undefined ||
				jogo.foto_capa == undefined ||
				jogo.foto_capa.length > 200 ||
				jogo.link == undefined ||
				jogo.link.length > 200 ||
				jogo.foto_banner == undefined ||
				jogo.foto_banner.length > 200 ||
				id == undefined ||
				id == '' ||
				id == null ||
				id <= 0 ||
				isNaN(id)
			) {
				return MESSAGE.ERROR_REQUIRED_FIELDS //400
			} else {
				//Validar se o id existe no BD
				let resultJogo = await buscarJogo(parseInt(id))

				if (resultJogo.status_code == 200) {
					//Update
					// Adiciona um atributo id no JSON para encaminhar id da requisição
					jogo.id = parseInt(id)
					let result = await jogoDAO.updateJogo(jogo)

					if (result) {
						return MESSAGE.SUCCESS_UPDATED_ITEM //200
					} else {
						return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
					}
				} else if (resultJogo.status_code == 404) {
					return MESSAGE.ERROR_NOT_FOUND //400
				} else {
					return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
				}
			}
		} else {
			return MESSAGE.ERROR_CONTENT_TYPE //415
		}
	} catch (error) {
		return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
	}
}

//Função para excluir o jogo
const excluirJogo = async (id) => {
	try {
		if (id == '' || id == null || id == undefined || id <= 0 || isNaN(id)) {
			return MESSAGE.ERROR_REQUIRED_FIELDS
		} else {
			let resultJogo = await jogoDAO.selectByIdJogo(parseInt(id))

			if (resultJogo != false || typeof resultJogo == 'object') {
				if (resultJogo.length > 0) {
					const getGameGenres = await generoDAO.selectGenreByGame(id)

					for (const genres of getGameGenres) {
						const idGameAndGenre = genres.id_jogo_genero
						const deleteGameAndGenre = await jogoGeneroController.deleteGameAndGenreController(idGameAndGenre)

						if (!deleteGameAndGenre.status) {
							return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
						}
					}

					let result = await jogoDAO.deleteJogo(id)

					if (result) {
						return MESSAGE.SUCCESS_DELETED_ITEM //200
					} else {
						return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
					}
				} else {
					return MESSAGE.ERROR_NOT_FOUND //404
				}
			} else {
				return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
			}
		}
	} catch (error) {
		return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
	}
}

//Função para retornar todos os jogos
const listarJogo = async () => {
	try {
		let dadosJogos = {}

		//Chama a função para retornar os dados do jogo
		let resultJogo = await jogoDAO.selectAllJogo()

		if (resultJogo != false || typeof resultJogo == 'object') {
			if (resultJogo.length > 0) {
				//Cria um objeto do tipo JSON para retornar a lista de jogos
				dadosJogos.status = true
				dadosJogos.status_code = 200
				dadosJogos.items = resultJogo.length
				dadosJogos.games = resultJogo

				for (const generos of resultJogo) {
					const genreGame = await generoDAO.selectGenreByGame(generos.id)

					genreGame.forEach((item) => {
						delete item.nome_jogo
					})

					generos.generos = genreGame
				}

				return dadosJogos //200
			} else {
				return MESSAGE.ERROR_NOT_FOUND //404
			}
		} else {
			return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
		}
	} catch (error) {
		return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
	}
}

//Função para buscar um jogo
const buscarJogo = async (id) => {
	try {
		let dadosJogos = {}
		let resultJogo = await jogoDAO.selectByIdJogo(parseInt(id))

		if (id == '' || id == null || id == undefined || id <= 0 || isNaN(id)) {
			return MESSAGE.ERROR_REQUIRED_FIELDS
		}

		if (id != '' || id != null || id != undefined || id < 1 || Number(id) || id != false || typeof resultJogo == 'object') {
			if (resultJogo.length > 0) {
				dadosJogos.status = true
				dadosJogos.status_code = 200
				dadosJogos.message = 'Operação realizada com sucesso!'
				dadosJogos.jogo_encontrado = resultJogo

				for (const generos of resultJogo) {
					const genreGame = await generoDAO.selectGenreByGame(generos.id)

					genreGame.forEach((item) => {
						delete item.nome_jogo
					})

					generos.generos = genreGame
				}

				return dadosJogos
			} else {
				return MESSAGE.ERROR_NOT_FOUND
			}
		} else {
			return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
		}
	} catch (error) {
		return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
	}
}

//Função para inserir um novo jogo
const inserirJogo = async (jogo, contentType) => {
	try {
		if (contentType == 'application/json') {
			if (
				jogo.nome == undefined ||
				jogo.nome == '' ||
				jogo.nome == null ||
				jogo.nome.length > 80 ||
				jogo.data_lancamento == undefined ||
				jogo.data_lancamento == '' ||
				jogo.data_lancamento == null ||
				jogo.data_lancamento.length > 10 ||
				jogo.versao == undefined ||
				jogo.versao == '' ||
				jogo.versao == null ||
				jogo.versao.length > 10 ||
				jogo.tamanho == undefined ||
				jogo.tamanho.length > 10 ||
				jogo.descricao == undefined ||
				jogo.foto_capa == undefined ||
				jogo.foto_capa.length > 200 ||
				jogo.link == undefined ||
				jogo.link.length > 200 ||
				jogo.link == null ||
				jogo.foto_banner == undefined ||
				jogo.foto_banner.length > 200 ||
				jogo.genero == undefined ||
				jogo.genero == null ||
				!Array.isArray(jogo.genero) ||
				!jogo.genero.length
			) {
				return MESSAGE.ERROR_REQUIRED_FIELDS //400
			} else {
				for (let genre of jogo.genero) {
					genre = genre.toUpperCase()
					const getGenre = await generoDAO.selectByGenreName(genre)

					if (getGenre.length < 1 || !getGenre) {
						return MESSAGE.ERROR_REQUIRED_FIELDS
					}
				}

				//Encaminha os dados do novo jogo para ser inserido no BD
				let resultJogo = await jogoDAO.insertJogo(jogo)

				if (resultJogo) {
					const dataInsertGameAndGenre = {}
					const getGameID = await jogoDAO.selectLastGame()

					getGameID.forEach((game) => {
						dataInsertGameAndGenre.id_jogo = game.id
						dataInsertGameAndGenre.genero = jogo.genero
					})

					const createGenre = await jogoGeneroController.insertGameAndGenreController(dataInsertGameAndGenre, 'application/json')

					return createGenre.status ? MESSAGE.SUCCESS_CREATED_ITEM : createGenre
				} else {
					return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
				}
			}
		} else {
			return MESSAGE.ERROR_CONTENT_TYPE
		}
	} catch (error) {
		return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
	}
}

module.exports = {
	atualizarJogo,
	excluirJogo,
	listarJogo,
	buscarJogo,
	inserirJogo
}
