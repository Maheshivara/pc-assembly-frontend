# PC Assembly Front End

Este é o projeto da interface da plataforma PC Assembly, para o correto funcionamento é necessário que as APIs de autenticação e listagem das peças estejam em funcionamento.

## Como rodar

> [!IMPORTANT]
> Esse tutorial assume que você possui o [NodeJS](https://nodejs.org/en) bem como as APIs operando nas suas portas padrão

1. Clone esse repositório no local desejado
2. Instale as dependências com:
   ```sh
   yarn install
   ```
3. Copie o arquivo [.env.example](./.env.example) para um novo arquivo no mesmo diretório com o nome `.env`, realize as alterações que se forem necessárias.
4. Inicie a aplicação com:
   ```sh
   yarn dev
   ```
5. Acesse a aplicação em http://localhost:3000
