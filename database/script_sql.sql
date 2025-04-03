CREATE DATABASE db_controle_jogos_bb;

USE db_controle_jogos_bb;

CREATE TABLE tbl_jogo (
	id 				INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome 			VARCHAR(80) NOT NULL,
    data_lancamento DATE NOT NULL,
    versao 			varchar(10) NOT NULL,
    tamanho 		varchar(10),
    descricao 		text,
    foto_capa 		varchar(200),
    link 			varchar(200) NOT NULL
);

CREATE TABLE tbl_genero (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(45) NOT NULL
);

SHOW TABLES;
DESC tbl_jogo;