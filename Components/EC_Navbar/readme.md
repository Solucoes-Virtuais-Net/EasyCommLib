# EC_Navbar

Primeiro componente navbar para ecommerce.

> inserindo o css
```html
    <link rel="stylesheet" href="https://github.com/Solucoes-Virtuais-Net/EasyCommLib/tree/Master/Components/EC_Navbar/styles/EC_Navbar.min.css">
```

> inserindo o javascript
 ```javascript
<script src="https://cdn.jsdelivr.net/gh/Solucoes-Virtuais-Net/EasyCommLib/Components/EC_Navbar/EC_Navbar%401.0.0js"></script>
```


## Exemplo


###  HTML
```html
  <nav id="init">
            <div ec-tarja>
                Frete grátis
            </div>
            <div ec-navbar>
                <a ec-logo href="#!">
                    <img src="logo" alt="logo">
                </a>
                <div ec-options>
                    <!-- suas opções -->
                </div>
            </div>
            <div ec-bottom-options>
                <ul>
                    <li id="exemplo1">
                        <a>exemplo1</a>
                    </li>
                    <li id="exemplo2">
                        <a>exemplo2</a>
                    </li>
                </ul>
                <div ec-drop-target="exemplo1">
                    exemplo 1
                </div>
                <div ec-drop-target="exemplo2">
                    exemplo 2
                </div>
            </div>
            <div>
            </div>
        </nav>
```

### Insere em seu javascript

```html
<script>
    var item = new EC_Navbar("#init");
    item.Init();
</script>
```

> ## Config

```javascript
     var item = new EC_Navbar("#init");
        item.Config({
            logoAlignX: "center",
            toolsAlignX: "end",
            logoAlignY: "start",
            toolsAlignY: "start",
            responsive: [
                {
                    mediaPoint: 762,
                    logoAlignX: "center",
                    toolsAlignX: "center",
                    logoAlignY: "end",
                    toolsAlignY: "start",
                }
            ]
        })
        item.Init();
```

> ## Atributos

dentro de seu elemento pai (com o id #init por exemplo), você pode inserir atributos em seus filhos para seguir de acordo com as estilizações padrões do `css` e também seguir com as configurações do `javascript` e de sua **`config`**. São elas:

- `ec-tarja` - div para implementar o tarja em cima do navbar
- `ec-navbar` - div principal do navbar superior.
- `ec-logo` - insere-o em um elemento que seja a logo ou corpo de uma logo. Mas ela precisa ser inserida estando dentro do pai que possua um `ec-navbar`.
- `ec-options` -  insere-o em um elemento que será inserido dentro deles outros elementos filhos. Também precisa ser inserido dentro do pai `ec-navbar`.
- `ec-bottom-options` - as opções no navbar de baixo do navbar superior. 


- `ec-drop-target` - atributo onde vai ser implementado o contexto de um **dropdown**. Mas para que isso funcione, um item de uma lista precisa ter em seu id os mesmos valores que os valores do ec-drop-target, por exemplo:
  ```html
        <div ec-bottom-options>
            <ul>
                <li id="exemplo1">
                    <a>link exemplo 1</a>
                </li>
                <li id="exemplo2">
                    <a>link exemplo2</a>
                </li>
            </ul>
            <div ec-drop-target="exemplo1">
                contexto de exemplo 1
            </div>
            <div ec-drop-target="exemplo2">
                contexto de exemplo 2
            </div>
    </div>
  ``` 
  <br>
  <br>
  <br>

> ## Config - parâmetros

| Parâmetros    | Tipos                        | Descrição                                                                                                                                                                                                                                                                                     |
| :------------ | :--------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `logoAlignX`  | `"center", "end" ou "start"` | Alinhe horizontalmente sua logo                                                                                                                                                                                                                                                               |
| `logoAlignY`  | `"start" ou "end"`           | Alinhe verticalmente sua logo.                                                                                                                                                                                                                                                                |
| `toolsAlignX` | `"center", "end" ou "start"` | Alinhe horizontalmente suas opções (icones de pesquisa, usuário logado, etc).                                                                                                                                                                                                                 |
| `toolsAlignY` | `"end" ou "start"`           | Alinhe verticalmente suas opções.                                                                                                                                                                                                                                                             |
| `responsive`  | `object[]`                   | array de objetos onde cada objeto aceita os mesmos dados que os parâmentros anteriores. Além de uma nova propriedade obrigatória chamada `mediaPoint` que serve para informar até qual largura da tela ele irá respeitar os valores preenchidos do objeto e assim responder a responsividade. |