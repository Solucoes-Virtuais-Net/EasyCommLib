# EC-Carousel

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


