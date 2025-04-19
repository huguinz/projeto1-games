/*****************************************************************
 * Objetivo: API referente ao projeto de controle de jogos
 * Data: 13/02/2025
 * Autor: Hugo Lopes
 * Versão: 1.0
 * Observação:
 ********* Para configurar e instalar a API, precisamos das seguintes bibliotecas:
 *               express         npm install express --save
 *               cors            npm install cors --save
 *               body-parser     npm install body-parser --save
 *
 ********* Para configurar e instalar o acesso ao Banco de Dados precisamos:
 *               prisma          npm install prisma --save (conexão com o BD)
 *               prisma/client   nom install @prisma/client --save (Executa scripts no BD)
 *
 * ******* Após a instalação do prisma e do prisma client, devemos:
 *          npx prisma init (Inicializar o prisma no projeto)
 *
 * ******* Para realizar o sincronismo do prisma com o DB, devemos executar o seguinte comando:
 *          npx prisma migrate dev
 ********************************************************************/

//Import das bibliotecas para criar a API
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

//Import das controllers parar realizar o CRUD de dados
const controllerJogo = require('./controller/jogo/controllerJogo.js')
const controllerGenero = require('./controller/genero/controllerGenero.js')
const controllerMultiplayer = require('./controller/multiplayer/controllerMultiplayer.js')
const controllerPlatform = require('./controller/plataforma/controllerPlataforma.js')

//Estabelecendo o formato de dados que deverá chegar no body da requisição (POST ou PUT)
const bodyParserJSON = bodyParser.json()

//Cria um objeto app para criar a API
const app = express()

//Configurações do cors
app.use((request, response, next) => {
	response.header('Access-Control-Allow-Origin', '*')
	response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

	app.use(cors())
	next()
})

//EndPoint para inserir um jogo no banco de dados
app.post('/v1/controle-jogos/jogo', cors(), bodyParserJSON, async (request, response) => {
	//Recebe o content type para validar o tipo de dados da requisição
	let contentType = request.headers['content-type']
	//Recebe o conteúdo do body da requisição
	let dadosBody = request.body

	//Encaminhando os dados do body da requisição para a controller inserir no BD
	let resultJogo = await controllerJogo.inserirJogo(dadosBody, contentType)

	response.status(resultJogo.status_code)
	response.json(resultJogo)
})

app.get('/v1/controle-jogos/jogo', cors(), async (request, response) => {
	//Criar função para listar jogos
	let resultJogo = await controllerJogo.listarJogo()

	response.status(resultJogo.status_code)
	response.json(resultJogo)
})

app.get('/v1/controle-jogos/jogo/:id', cors(), async (request, response) => {
	let uf = request.params.id
	let resultJogo = await controllerJogo.buscarJogo(uf)

	response.status(resultJogo.status_code)
	response.json(resultJogo)
})

app.delete('/v1/controle-jogos/jogo/delete/:id', cors(), async (request, response) => {
	let idJogo = request.params.id
	let resultJogo = await controllerJogo.excluirJogo(idJogo)

	response.status(resultJogo.status_code)
	response.json(resultJogo)
})

app.put('/v1/controle-jogos/jogo/update/:id', cors(), bodyParserJSON, async (request, response) => {
	//Recendo o content type da requisição
	let contentType = request.headers['content-type']

	//Recebe o ID do jogo
	let idJogo = request.params.id

	//Recebe os dados do jogo encaminhando no body da requisição
	let dadosBody = request.body

	let resultJogo = await controllerJogo.atualizarJogo(dadosBody, idJogo, contentType)

	response.status(resultJogo.status_code)
	response.json(resultJogo)
})

app.post('/v1/controle-jogos/jogo/genero', cors(), bodyParserJSON, async (request, response) => {
	const contentType = request.headers['content-type']
	const dadosBody = request.body

	const responseGender = await controllerGenero.insertGenreController(dadosBody, contentType)

	response.status(responseGender.status_code)
	response.json(responseGender)
})

app.get('/v1/controle-jogos/jogo/genero/select', cors(), bodyParserJSON, async (request, response) => {
	const responseAllGender = await controllerGenero.selectAllGenreController()

	response.status(responseAllGender.status_code)
	response.json(responseAllGender)
})

app.get('/v1/controle-jogos/jogo/genero/:id', cors(), async (request, response) => {
	const idGenre = request.params.id
	let responseIdGender = await controllerGenero.selectByIdGenreControler(idGenre)

	response.status(responseIdGender.status_code)
	response.json(responseIdGender)
})

app.delete('/v1/controle-jogos/jogo/genero/delete/:id', cors(), async (request, response) => {
	let idGenre = request.params.id
	let responseDeleteId = await controllerGenero.deleteGenreController(idGenre)

	response.status(responseDeleteId.status_code)
	response.json(responseDeleteId)
})

app.put('/v1/controle-jogos/jogo/genero/update/:id', cors(), bodyParserJSON, async (request, response) => {
	let contentType = request.headers['content-type']
	let idGameGenre = request.params.id
	let body = request.body

	let responseUpdateId = await controllerGenero.updateGenreController(body, idGameGenre, contentType)

	response.status(responseUpdateId.status_code)
	response.json(responseUpdateId)
})

app.post('/v1/controle-jogos/jogo/multiplayer', cors(), bodyParserJSON, async (request, response) => {
	const contentType = request.headers['content-type']
	const dadosBody = request.body

	const responseMultiplayer = await controllerMultiplayer.insertMultiplayerController(dadosBody, contentType)

	response.status(responseMultiplayer.status_code)
	response.json(responseMultiplayer)
})

app.get('/v1/controle-jogos/jogo/multiplayer/select', cors(), async (request, response) => {
	const responseAllMultiplayer = await controllerMultiplayer.selectAllMultiplayerController()

	response.status(responseAllMultiplayer.status_code)
	response.json(responseAllMultiplayer)
})

app.get('/v1/controle-jogos/jogo/multiplayer/:id', cors(), async (request, response) => {
	const idMultiplayer = request.params.id
	const responseIdMultiplayer = await controllerMultiplayer.selectByIdMultiplayerControler(idMultiplayer)

	response.status(responseIdMultiplayer.status_code)
	response.json(responseIdMultiplayer)
})

app.delete('/v1/controle-jogos/jogo/multiplayer/delete/:id', cors(), async (request, response) => {
	const idMultiplayer = request.params.id
	const responseDeleteId = await controllerMultiplayer.deleteMultiplayerController(idMultiplayer)

	response.status(responseDeleteId.status_code)
	response.json(responseDeleteId)
})

app.put('/v1/controle-jogos/jogo/multiplayer/update/:id', cors(), bodyParserJSON, async (request, response) => {
	const contentType = request.headers['content-type']
	const idMultiplayer = request.params.id
	const body = request.body

	const responseUpdateId = await controllerMultiplayer.updateMultiplayerController(body, idMultiplayer, contentType)

	response.status(responseUpdateId.status_code)
	response.json(responseUpdateId)
})

app.post('/v1/controle-jogos/jogo/plataforma', cors(), bodyParserJSON, async (request, response) => {
	const contentType = request.headers['content-type']
	const data = request.body

	const responsePlatform = await controllerPlatform.insertPlatformController(data, contentType)

	response.status(responsePlatform.status_code)
	response.json(responsePlatform)
})

app.get('/v1/controle-jogos/jogo/plataforma/select', cors(), async (request, response) => {
	const responseAllPlatform = await controllerPlatform.selectAllPlatformController()

	response.status(responseAllPlatform.status_code)
	response.json(responseAllPlatform)
})

app.get('/v1/controle-jogos/jogo/plataforma/:id', cors(), async (request, response) => {
	const idPlatform = request.params.id
	const responsePlatform = await controllerPlatform.selectByIdPlatformController(idPlatform)

	response.status(responsePlatform.status_code)
	response.json(responsePlatform)
})

app.delete('/v1/controle-jogos/jogo/plataforma/delete/:id', cors(), async (request, response) => {
	const idPlatform = request.params.id
	const responseController = await controllerPlatform.deletePlatformController(idPlatform)

	response.status(responseController.status_code)
	response.json(responseController)
})

app.put('/v1/controle-jogos/jogo/plataforma/update/:id', cors(), bodyParserJSON, async (request, response) => {
	const contentType = request.headers['content-type']
	const idPlatform = request.params.id
	const body = request.body

	const responseController = await controllerPlatform.updatePlatformController(body, idPlatform, contentType)

	response.status(responseController.status_code)
	response.json(responseController)
})

app.listen(8080, () => {
	console.log('API aguardando requisições...')
})
