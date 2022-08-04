class EC_Carousel {
    constructor(ref) {
        this.ref = ref
    }
    numberItems = 1
    distanceItems = 20
    autoPlay = false
    autoPlay_time = 3000
    returnToInitItem = false
    reduceWidthScrolling = 0
    responsive = []
    //CONFIGURAÇÕES
    config({
        numberItems,
        distanceItems,
        autoPlay,
        autoPlay_time,
        responsive,
        reduceWidthScrolling,
        returnToInitItem
    }) {
        if (numberItems) this.numberItems = numberItems;
        if (distanceItems) this.distanceItems = distanceItems;
        if (autoPlay) this.autoPlay = autoPlay;
        if (autoPlay_time) this.autoPlay_time = autoPlay_time;
        if (responsive) this.responsive = responsive;
        if (returnToInitItem) this.returnToInitItem = returnToInitItem;
        if (reduceWidthScrolling) this.reduceWidthScrolling = reduceWidthScrolling;
    }

    //INICIALIZAÇÃO
    init() {
        const {
            ref,
            responsive
        } = this;

        var responsiveInit = { ...this };
        var container = document.querySelector(ref);
        if (container !== null && container !== undefined) {

            container.style.position = "relative";
            var container_filhos = container.querySelectorAll(`${ref} > div`);

            var arrowImageLeft = container.querySelector(`${ref} #arrow-left`)
            var arrowImageRight = container.querySelector(`${ref} #arrow-right`)
            var arrowImageLeft_disable = container.querySelector(`${ref} #arrow-left-disable`)
            var arrowImageRight_disable = container.querySelector(`${ref} #arrow-right-disable`)

            container.innerHTML = "";
            var CreatecontainerInner = document.createElement("div");
            CreatecontainerInner.classList.add("sv-list");
            CreatecontainerInner.style.width = window.innerWidth;
            CreatecontainerInner.style.overflowX = "hidden";
            CreatecontainerInner.style.position = "relative";

            container.append(CreatecontainerInner);
            var containerInner = document.querySelector(`${ref} > .sv-list`);
            containerInner.style.cursor = "grabber"
            containerInner.style.display = "flex"
            containerInner.style.scrollBehavior = "smooth"

            function loadListCarousel() {
                containerInner.innerHTML = "";
                function newDIC() {
                    var DIC = document.createElement("div");
                    DIC.classList.add("sv-DIC")
                    DIC.style.display = "grid";
                    DIC.style.gap = `${responsiveInit.distanceItems}px`;
                    DIC.style.paddingLeft = `${responsiveInit.distanceItems / 2}px`;
                    DIC.style.paddingRight = `${responsiveInit.distanceItems / 2}px`;
                    DIC.style.paddingTop = '20px';
                    DIC.style.paddingBottom = '20px';
                    DIC.style.gridTemplateColumns = `repeat(${responsiveInit.numberItems}, 1fr)`;
                    DIC.style.minWidth = "100%";
                    // DIC.style.pointerEvents = 'none';
                    DIC.style.scrollSnapAlign = "start";
                    return DIC;
                }
                containerInner.appendChild(newDIC());

                for (let index = 0; index < container_filhos.length; index++) {
                    var containerItem = container_filhos[index];
                    var itemsImage = containerItem.querySelectorAll("img")
                    itemsImage.forEach(e => {
                        e.setAttribute("draggable", "false");
                    })

                    var fragment = document.createDocumentFragment();
                    // containerItem.style.pointerEvents = 'none';
                    var DICs = document.querySelectorAll(`${ref} .sv-list > .sv-DIC`);
                    var getLastDIC = DICs[DICs.length - 1];
                    var numberItemsValid = (getLastDIC.childNodes.length + 1) <= responsiveInit.numberItems;
                    if (numberItemsValid) {
                        fragment.appendChild(containerItem);
                        getLastDIC.append(fragment);
                    }
                    else {
                        fragment.appendChild(containerItem)
                        containerInner.appendChild(newDIC());
                        var getUpdateList = document.querySelectorAll(`${ref} .sv-list > .sv-DIC`);
                        var newLastDIC = getUpdateList[getUpdateList.length - 1];
                        newLastDIC.append(fragment);
                    }
                }

            }

            loadListCarousel();

            const listItem_find = containerInner.querySelectorAll(".sv-DIC > div");

            function disableAllItemClickable() {
                listItem_find.forEach(e => {
                    e.style.pointerEvents = "none";
                })
            }
            function enableAllItemClickable() {
                listItem_find.forEach(e => {
                    e.style.pointerEvents = "inherit";
                })
            }

            //Evento de mouse
            let pos = { top: 0, left: 0, x: 0, y: 0 };

            const mouseDownHandler = function (e) {
                containerInner.style.cursor = 'grabbing';
                containerInner.style.userSelect = 'none';
                containerInner.style.scrollSnapType = "none";
                containerInner.style.scrollBehavior = "smooth"
                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                    pos = {
                        left: containerInner.scrollLeft,
                        top: containerInner.scrollTop,
                        // Get the current mouse position
                        x: e.changedTouches[0].clientX,
                        y: e.changedTouches[0].clientY,
                    };
                } else {
                    pos = {
                        left: containerInner.scrollLeft,
                        top: containerInner.scrollTop,
                        // Get the current mouse position
                        x: e.clientX,
                        y: e.clientY,
                    };
                }
                document.addEventListener('mousemove', mouseMoveHandler);
                document.addEventListener('mouseup', mouseUpHandler);
                document.addEventListener('touchmove', mouseMoveHandler);
                document.addEventListener('touchstart', mouseUpHandler);
            };

            const mouseMoveHandler = function (e) {
                containerInner.style.scrollBehavior = "auto"
                disableAllItemClickable();

                // How far the mouse has been moved
                let dx;
                let dy;

                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                    dx = e.changedTouches[0].clientX - pos.x;
                    dy = e.changedTouches[0].clientY - pos.y;
                } else {
                    dx = e.clientX - pos.x;
                    dy = e.clientY - pos.y;
                }


                // Scroll the element
                containerInner.scrollTop = pos.top - dy;
                containerInner.scrollLeft = pos.left - dx;
            };

            const mouseUpHandler = function () {
                containerInner.style.cursor = 'grab';
                containerInner.style.removeProperty('user-select');
                // containerInner.style.scrollSnapType = "x mandatory";

                // containerInner.style.scrollBehavior = "initial




                document.removeEventListener('mousemove', mouseMoveHandler);
                document.removeEventListener('mouseup', mouseUpHandler);
                window.removeEventListener('touchmove', mouseMoveHandler);
                window.removeEventListener('touchend', mouseUpHandler);
                enableAllItemClickable();
            };
            containerInner.addEventListener('mousedown', mouseDownHandler);
            containerInner.addEventListener('touchstart', mouseDownHandler);


            // ARROWS
            var arrows = document.createElement("div");
            arrows.classList.add("sv-arrows");
            arrows.style.position = "absolute"
            arrows.style.top = "50%"
            arrows.style.transform = "translateY(-50%)"
            arrows.style.width = "100%"
            container.appendChild(arrows);

            function arrowIconCreate(direction) {
                var divIcon = document.createElement("div");
                divIcon.style.height = "20px";
                divIcon.style.width = "20px";
                divIcon.style.borderTop = "solid 4px #fff";
                divIcon.style.borderRadius = "2px";
                divIcon.style.borderLeft = "solid 4px #fff";
                if (direction === "left") divIcon.style.transform = 'rotate(-45deg)';
                if (direction === "right") divIcon.style.transform = 'rotate(135deg)';
                return divIcon
            }

            //LARGURA TOTAL DE UM ITEM
            function largItem() {
                var widthItem = container.querySelector(`.sv-list .sv-DIC > div`);
                var responseWidthItemStep = widthItem.offsetWidth + responsiveInit.distanceItems;
                return responseWidthItemStep;
            }

            var saveLeftImageArrow = arrowImageLeft?.src;
            //ArrowLeft
            var leftArrow = document.createElement("div");
            leftArrow.classList.add("left");
            leftArrow.style.position = "absolute";
            leftArrow.style.left = "20px";
            if (arrowImageLeft === null) {
                leftArrow.style.background = "#0005";
                leftArrow.style.borderRadius = "100%";
                leftArrow.style.width = "80px";
                leftArrow.style.display = "flex";
                leftArrow.style.justifyContent = "center";
                leftArrow.style.alignItems = "center";
                leftArrow.style.height = "80px";
                leftArrow.style.zIndex = "9999";
                leftArrow.style.cursor = "pointer";
                arrows.appendChild(leftArrow);
            } else {
                arrowImageLeft.style.position = 'absolute';
                arrowImageLeft.style.left = '20px';
                arrowImageLeft.style.width = '80px';
                arrowImageLeft.style.cursor = "pointer";
                arrowImageLeft.style.zIndex = "9999";
                arrowImageLeft.classList.add("left");
                arrows.appendChild(arrowImageLeft);
            }

            const leftArrow_find = arrows.querySelector(".left")
            leftArrow_find.classList.add("disable");
            leftArrow_find.appendChild(arrowIconCreate("left"))


            var saveRightImageArrow = arrowImageRight?.src;
            //ArrowRight
            var rightArrow = document.createElement("div");
            rightArrow.classList.add("right");
            rightArrow.style.position = "absolute";
            if (arrowImageRight === null) {
                rightArrow.style.right = "20px";
                rightArrow.style.background = "#0005";
                rightArrow.style.borderRadius = "100%";
                rightArrow.style.width = "80px";
                rightArrow.style.display = "flex";
                rightArrow.style.justifyContent = "center";
                rightArrow.style.alignItems = "center";
                rightArrow.style.cursor = "pointer";
                rightArrow.style.height = "80px";
                rightArrow.style.zIndex = "9999";
                arrows.appendChild(rightArrow);
            } else {
                arrowImageRight.style.position = "absolute";
                arrowImageRight.style.right = "20px";
                arrowImageRight.style.width = '80px';
                arrowImageRight.style.cursor = "pointer";
                arrowImageRight.style.zIndex = "9999";
                arrowImageRight.classList.add("right");
                arrows.appendChild(arrowImageRight);
            }

            var rightArrow_find = arrows.querySelector(".right");
            rightArrow_find.appendChild(arrowIconCreate("right"))


            let countStep = 0;
            var numberItemsTotal = container_filhos.length;
            var isNumberMax = parseInt((numberItemsTotal - responsiveInit.numberItems).toFixed(0)) + 1;

            arrowHandle(countStep, isNumberMax);
            let beforeScrollWidth = 0;
            function step() {
                var scrollWidth = containerInner.scrollLeft;
                let calcStep;
                if (scrollWidth > beforeScrollWidth)
                    calcStep = parseInt(((scrollWidth + responsiveInit.reduceWidthScrolling) / largItem()).toFixed(0));

                if (scrollWidth < beforeScrollWidth)
                    calcStep = parseInt(((scrollWidth - responsiveInit.reduceWidthScrolling) / largItem()).toFixed(0))

                // console.log({calcStep})
                if (calcStep !== undefined) {
                    if (calcStep <= isNumberMax) {
                        countStep = calcStep;

                        setTimeout(() => {
                            arrowHandle(countStep, isNumberMax)
                            containerInner.style.scrollBehavior = "smooth"
                            containerInner.scrollLeft = largItem() * calcStep;
                        }, 80)
                        beforeScrollWidth = scrollWidth;
                    }
                } else {
                    // containerInner.style.scrollBehavior = "smooth"
                    // containerInner.scrollLeft = largItem() * isNumberMax;
                }

            }
            containerInner.addEventListener("mouseup", () => step())
            containerInner.addEventListener("touchend", () => step())

            function arrowHandle(atual, max, direction) {
                // console.log({ atual, max })

                function enableLeft() {
                    leftArrow_find.classList.remove("disable");
                    if (arrowImageLeft_disable !== null)
                        leftArrow_find.src = saveLeftImageArrow;
                }
                function disableLeft() {
                    leftArrow_find.classList.add("disable");
                    if (arrowImageLeft_disable !== null)
                        leftArrow_find.src = arrowImageLeft_disable.src;

                }
                function enableRight() {
                    rightArrow_find.classList.remove("disable");
                    if (arrowImageRight_disable !== null)
                        rightArrow_find.src = saveRightImageArrow;
                }

                function disableRight() {
                    if (!responsiveInit.returnToInitItem) {
                        rightArrow_find.classList.add("disable");
                        if (arrowImageRight_disable !== null)
                            rightArrow_find.src = arrowImageRight_disable.src;
                    }
                }


                if (atual + 1 <= 1) {
                    // leftArrow_find.classList.add("disable");
                    disableLeft()
                    countStep = 0;
                    if (max === 1) disableRight()
                    if (max > 1) enableRight();
                } else if (atual + 1 === 0 && max > 1) {
                    // leftArrow_find.classList.add("disable");
                    disableLeft();
                    enableRight();
                } else if (atual + 1 > 0 && atual + 1 < max) {
                    // leftArrow_find.classList.remove("disable");
                    enableLeft();
                    enableRight();
                } else if (atual + 1 >= max) {
                    countStep = max - 1;
                    // leftArrow_find.classList.remove("disable");
                    enableLeft();
                    disableRight()
                    if (responsiveInit.returnToInitItem && atual + 1 > max) {
                        containerInner.style.scrollBehavior = "smooth";
                        containerInner.scrollLeft = 0;
                        countStep = 0;
                        disableLeft();
                    }
                }

                if (direction === "left") {
                    containerInner.style.scrollBehavior = "smooth";
                    containerInner.scrollLeft += -largItem();
                } else if (direction === "right") {
                    if (atual + 1 <= max) {
                        containerInner.style.scrollBehavior = "smooth";
                        containerInner.scrollLeft += largItem();
                    } else;
                } else if (direction === null || direction === undefined) {
                    containerInner.style.scrollBehavior = "smooth";
                    containerInner.scrollLeft = largItem() * atual;
                } else {
                    throw new Error("deu ruim!!!")
                }
            }

            //PREVIOUS
            leftArrow_find.addEventListener("click", () => {
                countStep -= 1;
                arrowHandle(countStep, isNumberMax, "left");
                dotActiveHandle();
                autoPlayInit();
            })

            //NEXT
            rightArrow_find.addEventListener("click", () => {
                countStep += 1;
                arrowHandle(countStep, isNumberMax, "right")
                dotActiveHandle();
                autoPlayInit();
            })


            //DOTS

            function createContainerDots() {
                var containerDot = document.createElement("div");
                containerDot.classList.add("sv-dots");
                containerDot.style.position = "absolute";
                containerDot.style.bottom = '-20px';
                containerDot.style.width = '100%';
                containerDot.style.left = '0';
                containerDot.style.padding = '10px';
                containerDot.style.display = 'flex';
                containerDot.style.justifyContent = 'center';
                return containerDot;
            }
            container.append(createContainerDots())

            function importDotsItems() {
                var dotContainer = container.querySelector(".sv-dots");
                dotContainer.innerHTML = "";
                for (let index = 0; index < isNumberMax; index++) {
                    var dot = document.createElement("button");
                    dot.classList.add("dot");
                    dot.style.padding = "8px";
                    dot.style.margin = "4px"
                    dotContainer.appendChild(dot);
                }
            }
            importDotsItems();


            function dotActiveHandle() {
                var dotsList = document.querySelectorAll(".sv-dots > .dot");
                function clearActiveDots(dt) {
                    dt.forEach(d => {
                        d.classList.remove("active");
                    })
                }
                clearActiveDots(dotsList);
                var dotStep = countStep;
                dotsList[dotStep]?.classList.add("active");
            }

            function dotsHandleClick() {
                var dotsList = document.querySelectorAll(".sv-dots > .dot");
                for (let index = 0; index < dotsList.length; index++) {
                    const d = dotsList[index];

                    d.addEventListener("click", () => {
                        setTimeout(() => {
                            countStep = index;
                            dotActiveHandle();
                            arrowHandle(countStep, isNumberMax);
                            autoPlayInit();
                        }, 80);
                    })
                }
            }

            containerInner.addEventListener("mouseup", dotActiveHandle)
            containerInner.addEventListener("touchend", dotActiveHandle)
            dotsHandleClick();
            dotActiveHandle();

            //TEMPORIZADOR
            let intervalNumber;
            let isPaused = false;
            function autoPlayInit() {
                clearInterval(intervalNumber);
                intervalNumber = null;
                function interval() {
                    const initialInterval = setInterval(() => {
                        if (!isPaused) {
                            if (countStep === isNumberMax - 1) {
                                countStep = 0;
                            } else { countStep += 1; }
                            arrowHandle(countStep, isNumberMax);
                            dotActiveHandle();
                        }
                    }, responsiveInit.autoPlay_time)
                    return initialInterval;
                }
                intervalNumber = interval();
                containerInner.addEventListener("mousemove", () => isPaused = true)
                containerInner.addEventListener("mouseleave", () => isPaused = false);
                containerInner.addEventListener("touchmove", () => isPaused = true)
                containerInner.addEventListener("touchend", () => isPaused = false);
            }

            if (responsiveInit.autoPlay) autoPlayInit();


            //OBSERVADOR DE RESPONSIVIDADE
            function responsiveObserver() {
                var windowWidth = window.innerWidth;
                var findPointActive = responsive.filter(r => r.mediaPoint <= windowWidth).pop();
                if (findPointActive) {
                    responsiveInit.numberItems = findPointActive.numberItems
                    responsiveInit.distanceItems = findPointActive.distanceItems
                    responsiveInit.autoPlay = findPointActive.autoPlay
                    responsiveInit.autoPlay_time = findPointActive.autoPlay_time
                    loadListCarousel();
                    autoPlayInit();

                    importDotsItems();
                    dotActiveHandle();
                    dotsHandleClick();
                }
            }
            window.addEventListener("DOMContentLoaded", responsiveObserver, true)
        } else {
            console.log({ "EC_CarouselMessage": `${ref} não encontrada` })
        }
    }
}