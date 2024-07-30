# API-RESTful-Adonis-Back-End
Este projeto é uma API RESTful desenvolvida com AdonisJS e MySQL, estruturada para gerenciar usuários, clientes, produtos e vendas. A API implementa um sistema de cadastro, login e CRUD para clientes e produtos, além de registrar vendas.


## Observações

  - Esse projeto foi desenvolvido em um processo seletivo em que as frameworks usadas e o padrão MVC (sem views) foram solicitadas.
  - Aindas sobre o MVC fiquei em dúvida se era pra suprimir a camada service ou não, optei por suprimir, mas geralmente eu utilizo a camada controller junto com a service
  - O MySQL foi exigido como banco de dados.
  - As respostas deveriam ser em JSON.

## Extras

  - Testes funcionais para todas as rotas, todos os testes estão funcionando.
  - Um comando para criar o banco, rodas as migrações e iniciar o server.
  - Uma função para criar o banco de dados antes de rodar os testes.

## Dificuldades

  - Os frameworks solicitados foram novos para mim, precisei ler a documentação do adonisjs, japa e lucid, o código poderá não estar otimizado como poderia estar pela falta de prática.
  - O meu código deveria ter mais tipagens ao estar desenvolvendo em ts, porém eventos de força maior me deixaram com apenas dois dias para estudar a documentação e fazer a API, então fiz o mais rápido possível.
  - Esses eventos de força maior foram: A mudança de minha esposa para minha residencia, o meu computador quebrando(gastei um dia inteiro só pra conseguir recuperar as minhas senhas e arquivos vitais), e meu notebook reserva que esta travando e hibernando com uma certa frequencia sozinho, o que me faz perder tempo(além de incomodar bastante)
  - Uns três testes não consegui comprovar completamente a funcionalidade da rota, será necessário um pouco mais de estudo sobre as funções disponíveis, mas como é um extra, não gastei muito mais tempo nesses detalhes.



## Instruções para Instalação e Execução

  - Vá até o diretório que deseja colocar o projeto

  - Clone o Repositório

        git clone https://github.com/Malrus-dev/API-RESTful-Adonis-Back-End.git

  - Navegue até o diretório do projeto

        cd API-RESTful-Adonis-Back-End
    
  - Instale as dependências
      
        npm install

  Configure o Banco de Dados

  - Crie um arquivo .env com as configurações do banco de dados e outras variáveis de ambiente necessárias. Use o arquivo .env.example como modelo.
  - Caso não tenha um banco de dados instalado(como o mysql), será necessário instalar um antes em sua máquina.

  - Execute as Migrações

        node ace migration:run

  - Caso de erro alertando que o banco de dados não existe, eu criei uma função que cria o banco de dados e roda o servidor

        run:with-data

  - Inicie o Servidor

        node ace serve --watch

Agora, sua API está pronta para ser usada. Você pode testar as rotas usando ferramentas como Postman, cURL, thunderclient, etc.



## Rodando Testes

- Configure o arquivo env.test inserindo o root e senha cadastrado no seu banco de dados

- Agora só rodar o comando abaixo:

      node ace test



## Rotas do Sistema

### Usuários

  Cadastro de Usuário
      POST /signup - Cadastra um novo usuário. (necessário enviar no body minimamente { email: string e password: string })

  Login
      POST /login - Autentica um usuário e gera um token JWT. (necessário enviar no body { email: string e password: string })

### Autenticando

  - Para autenticar primeiro cadastre um usuario na porta /singup
  - Depois pegue o token fazendo o login na porta /login, você receberá o token como resposta no body
  - Agora para acessar as outras rotas basta incluir no header (Authorization, Bearer OseuTokenVemAqui)

### Clientes (Necessário estar autenticado)

  Listar Clientes
      GET /clients - Lista todos os clientes cadastrados.
          Ordenados pelo id.

  Detalhar Cliente e Vendas
      GET /clients/:id - Detalha um cliente e suas vendas.
          Vendas mais recentes primeiro. 

  Adicionar Cliente
      POST /clients - Adiciona um novo cliente. (necessário enviar minimamente no body { name: string, cpf: string })

  Editar Cliente
      PUT /clients/:id - Edita os dados de um cliente.

  Excluir Cliente
      DELETE /clients/:id - Exclui um cliente e suas vendas.

### Produtos

  Listar Produtos
      GET /products - Lista todos os produtos cadastrados.
          Ordenados alfabeticamente.

  Detalhar Produto
      GET /products/:id - Detalha um produto.

  Criar Produto
      POST /products - Cria um novo produto. (necessário enviar minimamente no body { name: string, description: string, category: string, price: number })

  Editar Produto
      PUT /products/:id - Edita os dados de um produto.

  Excluir Produto (Soft Delete)
      DELETE /products/:id - Realiza a exclusão lógica de um produto.

### Vendas

  Registrar Venda
      POST /sales - Registra a venda de um produto a um cliente. (necessário enviar minimamente no body { clientId: number, productId: number, quantity: number })

