# EC_Navbar (v1.1.0)

Primeiro componente navbar para ecommerce.

> inserindo o css
```html
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Solucoes-Virtuais-Net/EasyCommLib/Components/EC_Navbar/styles/EC_navbar.min.css">
```

> inserindo o javascript
 ```javascript
<script src="https://cdn.jsdelivr.net/gh/Solucoes-Virtuais-Net/EasyCommLib/Components/EC_Navbar/EC_Navbar%401.1.0.js"></script>
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
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png"
                        alt="logo">
                </a>
                <div ec-options>
                    <span class="material-symbols-outlined">
                        search
                    </span>
                    <span class="material-symbols-outlined">
                        person
                    </span>
                    <span class="material-symbols-outlined">
                        local_mall
                    </span>
                </div>
                <div ec-mobile-button>
                    <span class="material-symbols-outlined">
                        menu
                    </span>
                </div>
            </div>
            <div ec-context-menu-mobile></div>
            <div ec-bottom-options>
                <ul>
                    <li id="exemplo2">
                        <a>exemplo2</a>
                    </li>
                </ul>
                <div ec-drop-target="exemplo1">
                    exemplo1
                </div>
                <div ec-drop-target="exemplo2">
                    exemplo2
                </div>
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
            navbarFixed: true,
            logoAlignX: "center",
            toolsAlignX: "end",
            logoAlignY: "start",
            toolsAlignY: "start",
            scrollyOnlyNavbar: true,
            scrollyOnlyNavbarPositionX_logo: "start",
            scrollyOnlyNavbarPositionX_options: "start",
            scrollyOnlyNavbarPositionX_bottomOptions: "center",

            responsive: [
                {
                    mediaPoint: 762,
                    logoAlignX: "center",
                    toolsAlignX: "center",
                    logoAlignY: "start",
                    toolsAlignY: "start"
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

> ## Mobile
Utilize a div com o atributo **ec-mobile-button** para ativa a funcionalidade de clique de abrir o menu, mas isso é apenas possível em mobile (abaixo de 762px).

Aplique também dentro de uma outra div que tenha um atributo chamado **ec-context-menu-mobile**, serve para mostrar o campo de contexto(menu) do navbar após clicar na div ec-mobile-button.

### Exemplo:
```html
            <div ec-navbar>
                <a ec-logo href="#!">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png"
                        alt="logo">
                </a>
                <div ec-options>
                    <span class="material-symbols-outlined">
                        search
                    </span>
                    <span class="material-symbols-outlined">
                        person
                    </span>
                    <span class="material-symbols-outlined">
                        local_mall
                    </span>
                </div>
                <div ec-mobile-button>
                    <span class="material-symbols-outlined">
                        menu
                    </span>
                </div>
            </div>
            <div ec-context-menu-mobile>
                Descreva o seu contexto aqui
            </div>
```

<br>
<br>
<br>


> ## Config - parâmetros

| Parâmetros                                 | Tipos                        | Descrição                                                                                                                                                                                                                                                                                     |
| :----------------------------------------- | :--------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `navbarFixed`                              | `boolean`                    | Navbar ser fixado (ou não).                                                                                                                                                                                                                                                                   |
| `scrollyOnlyNavbar`                        | `boolean`                    | Tornar um único navbar unido quando o scroll da página for diferente de 0.                                                                                                                                                                                                                    |
| `scrollyBackground`                        | `string`                     | Cor de fundo do navbar se o scroll da página for diferente de 0.                                                                                                                                                                                                                              |
| `scrollyBackgroundTop`                     | `string`                     | Cor de fundo do navbar se o scroll da página for diferente de 0.                                                                                                                                                                                                                              |
| `scrollyOnlyNavbarPositionX_logo`          | `"center", "end" ou "start"` | Posicionamento da logo quando o scroll do window for diferente de 0.                                                                                                                                                                                                                          |
| `scrollyOnlyNavbarPositionX_options`       | `"center", "end" ou "start"` | Posicionamento do option quando o scroll do window for diferente de 0.                                                                                                                                                                                                                        |
| `scrollyOnlyNavbarPositionX_bottomOptions` | `"center", "end" ou "start"` | Posicionamento do bottomOption quando o scroll do window for diferente de 0.                                                                                                                                                                                                                  |
| `logoAlignX`                               | `"center", "end" ou "start"` | Alinhe horizontalmente sua logo                                                                                                                                                                                                                                                               |
| `logoAlignY`                               | `"start" ou "end"`           | Alinhe verticalmente sua logo.                                                                                                                                                                                                                                                                |
| `toolsAlignX`                              | `"center", "end" ou "start"` | Alinhe horizontalmente suas opções (icones de pesquisa, usuário logado, etc).                                                                                                                                                                                                                 |
| `toolsAlignY`                              | `"end" ou "start"`           | Alinhe verticalmente suas opções.                                                                                                                                                                                                                                                             |
| `responsive`                               | `object[]`                   | array de objetos onde cada objeto aceita os mesmos dados que os parâmentros anteriores. Além de uma nova propriedade obrigatória chamada `mediaPoint` que serve para informar até qual largura da tela ele irá respeitar os valores preenchidos do objeto e assim responder a responsividade. |