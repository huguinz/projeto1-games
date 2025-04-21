/************************************************************************************
 * Objetivo: Arquivo de padronização de mensagens e status code para o projeto
 * Data: 20/02/2025
 * Autor: Hugo Lopes
 * Versão: 1.0
 ***********************************************************************************/

/****************************** MENSAGENS DE ERRO **********************************/
const ERROR_REQUIRED_FIELDS = {
	status: false,
	status_code: 400,
	message:
		'A requisição não pôde ser processada. Verifique se todos os campos obrigatórios foram preenchidos corretamente, se os valores estão dentro do limite de caracteres e se seguem os padrões permitidos.'
}
const ERROR_INTERNAL_SERVER_CONTROLLER = {
	status: false,
	status_code: 500,
	message: 'Não foi possível processar a requisição, pois ocorreram erros internos no servidor da controller!'
}

const ERROR_INTERNAL_SERVER_MODEL = {
	status: false,
	status_code: 500,
	message: 'Não foi possível processar a requisição, pois ocorreram erros internos no servidor da model!'
}

const ERROR_CONTENT_TYPE = {
	status: false,
	status_code: 415,
	message:
		'Não foi possível processar a requisição, pois o formato de dados encaminhado não é suportado pelo servidor. Favor encaminhar apenas JSON'
}

const ERROR_NOT_FOUND = {
	status: false,
	status_code: 404,
	message: 'Não foram encontrados itens para retornar'
}

/****************************** MENSAGENS DE SUCESSO **********************************/

const SUCCESS_CREATED_ITEM = {
	status: true,
	status_code: 201,
	message: 'Item criado com sucesso!'
}

const SUCCESS_DELETED_ITEM = {
	status: true,
	status_code: 200,
	message: 'item excluído com sucesso!'
}

const SUCCESS_UPDATED_ITEM = {
	status: true,
	status_code: 200,
	message: 'Item atualizado com sucesso!'
}

module.exports = {
	ERROR_REQUIRED_FIELDS,
	ERROR_INTERNAL_SERVER_CONTROLLER,
	ERROR_INTERNAL_SERVER_MODEL,
	ERROR_CONTENT_TYPE,
	SUCCESS_CREATED_ITEM,
	ERROR_NOT_FOUND,
	SUCCESS_DELETED_ITEM,
	SUCCESS_UPDATED_ITEM
}
