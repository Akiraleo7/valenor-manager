CREATE DATABASE valenor_db;
USE valenor_db;

CREATE TABLE produto (
	id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    qtd_estoque INT NOT NULL
);

CREATE TABLE venda (
	id INT AUTO_INCREMENT PRIMARY KEY,
    dt_venda DATE NOT NULL,
    vl_total DECIMAL(10,2) NOT NULL
);

CREATE TABLE item_venda (
	id INT AUTO_INCREMENT PRIMARY KEY,
	venda_id INT NOT NULL,
    FOREIGN KEY (venda_id) REFERENCES venda(id) ON DELETE CASCADE,
    produto_id INT NOT NULL,
    FOREIGN KEY (produto_id) REFERENCES produto(id),
    qtd_itens INT NOT NULL,
    preco_unitario DECIMAL(10,2) NOT NULL
);
