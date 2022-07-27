# EC_Library@1.0.0

Biblioteca de acesso eo api da loja integrada de maneira extremamente fácil.

 A **EC_Library** é uma classe e que você precisa chamá-la e inserir a **chave_api** como parâmetro 
  ```javascript
 const api = new EC_Library("{chave_api}");
 ```

 Depois disso, você utiliza sua variável inserindo as funções que existem nela. Entretanto, quase todas as funções são assíncronas. Então no momento da utilização da sua variável que precisa acessar a api, você precisa inserir o **await**

 ### Exemplo 1:
  ```javascript
    const api = new EC_Library("{chave_api}");

    async function meuComponente() {
        const user = await api.User();
    }
 ```

 ### Exemplo 2:
 ```javascript
 const api = new EC_Library("{chave_api}");

 document.addEventListener("DOMContentLoaded", async () => {
    const response = await api.Produtos();  
})
 ```


## Funções

Cada função que acessa a api é montada dentro do possível uma forma resumida. Ou seja, quando se utiliza uma função `Função()` por exemplo, quando você não insere nada como parâmeto ela retorna todas as informações e se inserir um valor como **string**, você pode coletar um dado específico `Função("id")`.

Você pode até mesmo possívelmente inserir rotas antes de inserir algum tipo de valor, mais detalhes no site da api: https://lojaintegrada.docs.apiary.io/#

<br>

 | Nome da função             | Descrição                                                                                              |
 | :------------------------- | :----------------------------------------------------------------------------------------------------- |
 | `Categorias`               | Retorna todas as categorias.                                                                           |
 | `Marca`                    | Retorna todas as marcas.                                                                               |
 | `Grade`                    | Retorna todas as Grades.                                                                               |
 | `Estoque`                  | Retorna todos os estoques de todos os produtos.                                                        |
 | `Produto`                  | Retorna todos os produtos.                                                                             |
 | `ImagensProduto`           | Retorna todas as imagens de um produto.                                                                |
 | `ImagemVisualizar`         | Único que não é **assíncrono** e que retorna a url da imagem de um produto, completando com a baseUrl. |
 | `Preco`                    | Retorna todos os precos de todos os produtos.                                                          |
 | `Cupom`                    | Retorna todos os cupons.                                                                               |
 | `SEO`                      | Retorna todos os SEO's.                                                                                |
 | `Cliente`                  | Retorna todos os clientes.                                                                             |
 | `Banco`                    | Retorna todos os bancos.                                                                               |
 | `Pagamento`                | Retorna todos os pagamentos.                                                                           |
 | `Envio`                    | Retorna todos os envios.                                                                               |
 | `Grupo`                    | Retorna todos os grupos.                                                                               |
 | `Pedido.Situacao`          | Retorna todas as situações.                                                                            |
 | `Pedido.HistoricoSituacao` | Retornar o histórico de alteração de um pedido.                                                        |
 | `Pedido.BuscarPedido`      | https://lojaintegrada.docs.apiary.io/#reference/pedido/buscar-pedidos/listar-historico-de-situacoes    |
 | `Pedido.PedidoEspecifico`  | Lista os dados de um pedido específico.                                                                |
 | `CodigoHTML`               | Lista todo o rodapé/head da loja                                                                       |