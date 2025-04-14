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
const controllerJogoGenero = require('./controller/jogo_genero/controllerJogoGenero.js')

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

	const responseGender = await controllerJogoGenero.insertGameGenreController(dadosBody, contentType)

	response.status(responseGender.status_code)
	response.json(responseGender)
})

app.get('/v1/controle-jogos/jogo/genero/select', cors(), bodyParserJSON, async (request, response) => {
	const responseAllGender = await controllerJogoGenero.selectAllGameGenreController()

	response.status(responseAllGender.status_code)
	response.json(responseAllGender)
})

app.get('/v1/controle-jogos/jogo/genero/:id', cors(), async (request, response) => {
	const idGenre = request.params.id
	let responseIdGender = await controllerJogoGenero.selectByIdGameGenreControler(idGenre)

	response.status(responseIdGender.status_code)
	response.json(responseIdGender)
})

app.delete('/v1/controle-jogos/jogo/genero/delete/:id', cors(), async (request, response) => {
	let idGenre = request.params.id
	let responseDeleteId = await controllerJogoGenero.deleteGameController(idGenre)

	response.status(responseDeleteId.status_code)
	response.json(responseDeleteId)
})

app.put('/v1/controle-jogos/jogo/genero/update/:id', cors(), bodyParserJSON, async (request, response) => {
	let contentType = request.headers['content-type']
	let idGameGenre = request.params.id
	let body = request.body

	let responseUpdateId = await controllerJogoGenero.updateGameController(body, idGameGenre, contentType)

	response.status(responseUpdateId.status_code)
	response.json(responseUpdateId)
})

app.listen(8080, () => {
	console.log('API aguardando requisições...')
})
