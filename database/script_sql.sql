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

CREATE TABLE tbl_multiplayer (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    modo_jogo VARCHAR(45) NOT NULL
);

CREATE TABLE tbl_plataforma (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    ano_lancamento INT NOT NULL
);

SHOW TABLES;
SELECT * FROM tbl_plataforma;
DESC tbl_plataforma;