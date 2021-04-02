# Carros

## Cadastro de carros

**Requisitos funcionais**

Deve ser possível cadastrar um novo carro.
Deve ser possível listar todas as categorias.

**Requisitos NÃO funcionais**

**Regra de negócio**

Não deve ser possível cadastrar um carro com uma placa já existente.
O carro deve ser cadastrado, por padrão com disponibilidade.
* O usuário responsável pelo cadastro deve ser um administrador.

## Listagem de carros

**Requisitos funcionais**

Deve ser possível listar todos os carros disponíveis.
Deve ser possível listar todos as especificação.
Deve ser possível listar todos os carros disponíveis pelo nome da marca.
Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
Deve ser possível listar todos os carros disponíveis pelo nome da carro.

**Requisitos NÃO funcionais**

**Regra de negócio**

O usuário não precisa estar logado no sistema.

## Cadastro de especificação no carro

**Requisitos funcionais**

Deve ser possível cadastrar uma especificação para um carro.


**Requisitos NÃO funcionais**

**Regra de negócio**

Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
O usuário responsável pelo cadastro deve ser um administrador.


## Cadastro de image do carro

**Requisitos funcionais**

Deve ser possível cadastrar a imagem para um carro.

**Requisitos NÃO funcionais**

Utilizar o multer para upload dos arquivos.

**Regra de negócio**

O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
O usuário responsável pelo cadastro deve ser um administrador.


## Aluguel de carro

**Requisitos funcionais**

Deve ser possível cadastrar um aluguel.

**Requisitos NÃO funcionais**

**Regra de negócio**

O aluguel deve ter duração mínima de 24 horas.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
