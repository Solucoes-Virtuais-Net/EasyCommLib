# EC-Carousel@1.1.4

componente javascript que se transforma em um carousel customizado e responsivo.

***Exemplo uso HTML***

```html

     <div id="carousel-init">            
            <div class="exemplo-item"></div>
            <div class="exemplo-item"></div>
            <div class="exemplo-item"></div>
    </div>
```


### Exemplo uso javascript

```javascript
   var carousel = new EC_Carousel("#carousel-init");

    carousel.config({
        numberItems: 2
    })
    
carousel.init();
```
------
## Config

**numberItems** - número de itens por scroll.

**distanceItems** - espaçamento entre os itens, o padrão é 20 (20px).

**autoPlay** - Inicializa a rolagem automático, o padrão é **false**.

**autoPlay_time** - Tempo estimado para a inicialização do scroll automático, o padrão é 3000 milisegundos (3 segundos).

**returnToInitItem** - Habilitar funcionalidade de clique no arrow right ele voltar para o início quando estiver no final da lista. O padrão é `false`.

### responsive

Array de objeto onde cada objeto aceita as mesmas propriedades do config e uma propriedade chamada **mediaPoint**, 
### Exemplo
```javascript
var carousel = new EC_Carousel("#carousel-init");

    carousel.config({
        numberItems: 5,
        responsive: [
            {
                mediaPoint: 762,
                numberItems: 3,
                distanceItems: 12,
                autoPlay: false
            },
            {
                mediaPoint: 360,
                numberItems: 1,
                distanceItems: 8,
                autoPlay: true,
                autoPlay_time: 5000
            }
        ]
    })
carousel.init();
```
### **setas**

Você pode customizar as setas inserindo **imagens de setas**, colocando seu `img` e suas respectivas classes:

### Exemplo

```html
       <div id="carousel-init">     
            <img id="arrow-left" src="./img/arrow left.png" alt="left">
            <img id="arrow-right" src="./img/arrow right.png" alt="right">
            <img id="arrow-left-disable" src="./img/arrow left disable.png" alt="leftDisable">
            <img id="arrow-right-disable" src="./img/arrow right disable.png" alt="rightDisable">

        
            <div class="exemplo-item"></div>
            <div class="exemplo-item"></div>
            <div class="exemplo-item"></div>
    </div>
```

insere os id's de acordo com o que estão acima e em seguida inserir as imagens de seta da forma que quiser.
 



