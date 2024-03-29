class EC_Navbar {
    navbarRef: string;
    constructor(navbarRef: string) {
        this.navbarRef = navbarRef;
    }

    //Configs
    navbarFixed: boolean = false;
    scrollyOnlyNavbar = false;
    logoAlignX: alignX = "center";
    toolsAlignX: alignX = "end";
    logoAlignY: alignY = "start";
    toolsAlignY: alignY = "start";
    scrollyBackgroundTop: string;
    scrollyBackground: string;

    scrollyOnlyNavbarPositionX_logo: alignX = "center";
    scrollyOnlyNavbarPositionX_options: alignX = "start";
    scrollyOnlyNavbarPositionX_bottomOptions: alignX = "end";
    responsive: IResponsive[];

    //news
    initNavbarFixedHeight: number = 0;
    initNavbarFixedHeightPosition: number = 0;
    initScrollyOnlyNavbarHeight: number = 0;

    Config({
        logoAlignX,
        logoAlignY,
        toolsAlignX,
        toolsAlignY,
        responsive,
        navbarFixed,
        scrollyOnlyNavbar,
        scrollyOnlyNavbarPositionX_logo,
        scrollyOnlyNavbarPositionX_options,
        scrollyOnlyNavbarPositionX_bottomOptions,
        scrollyBackground,
        scrollyBackgroundTop,
        
        initNavbarFixedHeight,
        initNavbarFixedHeightPosition,
        initScrollyOnlyNavbarHeight
    }) {
        if (logoAlignX) this.logoAlignX = logoAlignX;
        if (toolsAlignX) this.toolsAlignX = toolsAlignX;
        if (logoAlignY) this.logoAlignY = logoAlignY;
        if (toolsAlignY) this.toolsAlignY = toolsAlignY;
        if (responsive) this.responsive = responsive;
        if (initNavbarFixedHeight) this.initNavbarFixedHeight = initNavbarFixedHeight;
        if (navbarFixed) this.navbarFixed = navbarFixed;
        if (scrollyOnlyNavbar) this.scrollyOnlyNavbar = scrollyOnlyNavbar;
        if (initNavbarFixedHeightPosition) this.initNavbarFixedHeightPosition = initNavbarFixedHeightPosition;

        if (scrollyBackground) this.scrollyBackground = scrollyBackground;
        if (scrollyBackgroundTop) this.scrollyBackgroundTop = scrollyBackgroundTop;
        if (initScrollyOnlyNavbarHeight) this.initScrollyOnlyNavbarHeight = initScrollyOnlyNavbarHeight;

        if (scrollyOnlyNavbarPositionX_logo) this.scrollyOnlyNavbarPositionX_logo = scrollyOnlyNavbarPositionX_logo;
        if (scrollyOnlyNavbarPositionX_options) this.scrollyOnlyNavbarPositionX_options = scrollyOnlyNavbarPositionX_options;
        if (scrollyOnlyNavbarPositionX_bottomOptions) this.scrollyOnlyNavbarPositionX_bottomOptions = scrollyOnlyNavbarPositionX_bottomOptions;

    }

    Init() {
        const { navbarRef, responsive } = this;
        const containerInit: HTMLElement = document.querySelector(navbarRef);
        const logo: HTMLElement = containerInit.querySelector("[ec-logo]")
        const option: HTMLElement = containerInit.querySelector("div[ec-options]")
        const navbarOptions: NodeListOf<HTMLElement> = containerInit.querySelectorAll(`${navbarRef} li[id]`);
        containerInit.style.zIndex = "9999";
        var responsiveInit = { ...this };
        function alignHandler(itemAlignX: alignX, itemAlignY: alignY, item: HTMLElement) {
            if (window.innerWidth > 1023) {
                switch (itemAlignX) {
                    case "center":
                        item.style.gridColumnStart = "4"
                        break;
                    case "end": item.style.gridColumnStart = "7"
                        break;
                    case "start": item.style.gridColumnStart = "1"
                        break;
                }
                switch (itemAlignY) {
                    case "start": item.style.gridRowStart = "1"
                        break;
                    case "end": item.style.gridRowStart = "2"
                        break;
                }
            } else {
                switch (itemAlignX) {
                    case "center":
                        item.style.gridColumnStart = "2"
                        break;
                    case "end": item.style.gridColumnStart = "3"
                        break;
                    case "start": item.style.gridColumnStart = "1"
                        break;
                }
                switch (itemAlignY) {
                    case "start": item.style.gridRowStart = "1"
                        break;
                    case "end": item.style.gridRowStart = "2"
                        break;
                }
            }
        }

        function updateAlignItems(
            logoAlignX: alignX,
            logoAlignY: alignY,
            optionAlignX: alignX,
            optionAlignY: alignY,
        ) {
            alignHandler(logoAlignX, logoAlignY, logo);
            alignHandler(optionAlignX, optionAlignY, option)
        }
        updateAlignItems(responsiveInit.logoAlignX, responsiveInit.logoAlignY, responsiveInit.toolsAlignX, responsiveInit.toolsAlignY);

        //Mostrar/Não mostrar as informações
        function toggleContextDrop() {
            function hide(item: HTMLElement, navbar: HTMLElement) {
                item.classList.remove("show");
                item.classList.add("hide");
                navbar.classList.remove("active");
            }
            function show(item: HTMLElement, navbar: HTMLElement) {
                item.classList.add("show");
                item.classList.remove("hide");
                navbar.classList.add("active");
            }

            navbarOptions.forEach(n => {
                const id: string = n.getAttribute("id");
                const divReverent: HTMLElement = containerInit.querySelector(`div[ec-drop-target="${id}"]`);
                if (divReverent) {
                    divReverent.classList.add("hide");
                    n.addEventListener("mouseover", () => show(divReverent, n))
                    n.addEventListener("touchstart", () => show(divReverent, n))
                    n.addEventListener("mouseout", () => hide(divReverent, n))
                    divReverent.addEventListener("mouseover", () => show(divReverent, n));
                    divReverent.addEventListener("mouseout", () => hide(divReverent, n))
                }
            })
        }
        toggleContextDrop();

        function valiableFixedNavbar() {
            if (responsiveInit.navbarFixed) {
                const windowScroll = window.scrollY;
                if (windowScroll > responsiveInit.initNavbarFixedHeight) {
                    containerInit.style.cssText = `position: fixed; width: 100%; z-index: 999; `;
                } else {
                    containerInit.style.cssText = `position: relative; width: 100%; z-index: 999; `;
                }
            } else {
                containerInit.style.cssText = `position: relative; width: 100%; `;
            }
        }

        function variableBackgroundNavbar() {
            const { scrollyBackground, scrollyBackgroundTop } = responsiveInit;
            const windowScroll = window.scrollY;
            if (windowScroll > 0) {
                if (scrollyBackground)
                    containerInit.style.background = scrollyBackground;
                else
                    containerInit.style.background = "#fff";
            } else {
                if (scrollyBackgroundTop)
                    containerInit.style.background = scrollyBackgroundTop
                else
                    containerInit.style.background = "#fff";
            }
        }

        window.addEventListener("scroll", () => {
            valiableFixedNavbar();
            variableBackgroundNavbar();
        })
        window.addEventListener("DOMContentLoaded", () => {
            valiableFixedNavbar();
            variableBackgroundNavbar();
        })

        function valiablePositionScrollOnly() {
            const isTop = window.scrollY <= responsiveInit.initNavbarFixedHeightPosition;
            if (!isTop) {
                if (window.innerWidth > 762) {
                    alignHandler(responsiveInit.scrollyOnlyNavbarPositionX_logo, "start", logo);
                    alignHandler(responsiveInit.scrollyOnlyNavbarPositionX_options, "start", option);
                }
            } else {
                if (window.innerWidth > 762) {
                    alignHandler(responsiveInit.logoAlignX, "start", logo);
                    alignHandler(responsiveInit.toolsAlignX, "start", option);
                }
            }
        }
        if (responsiveInit.scrollyOnlyNavbar) window.addEventListener("scroll", valiablePositionScrollOnly)

        function onlyNavbarScrolling() {
            const navbar = containerInit.querySelector("[ec-navbar]");
            if (window.innerWidth > 1023) {
                const bottomOption: HTMLElement = containerInit.querySelector("[ec-bottom-options]");
                function movingBottomOptions() {
                    const isTop = window.scrollY <= responsiveInit.initScrollyOnlyNavbarHeight;
                    const navbarScroll: HTMLElement = document.querySelector(`${navbarRef} [ec-navbar] [ec-bottom-options]`);
                    if (!isTop) {
                        if (!navbarScroll) {
                            navbar.appendChild(bottomOption);
                            const divSaved = document.createElement("div");
                            divSaved.setAttribute("ec-save-local", "");
                            navbar.parentNode.insertBefore(divSaved, navbar.nextSibling);
                            // alignHandler("center", "start", navbarScroll)
                        }
                    } else {
                        if (navbarScroll) {
                            const savedLocalBottom = containerInit.querySelector("[ec-save-local]");
                            savedLocalBottom.after(bottomOption);
                            savedLocalBottom.remove();
                        }
                    }
                }

                function positionStylingBottomOption() {
                    const isTop = window.scrollY <= responsiveInit.initScrollyOnlyNavbarHeight;
                    const navbarScroll: HTMLElement = document.querySelector(`${navbarRef} [ec-navbar] [ec-bottom-options]`);
                    const drops: NodeListOf<HTMLElement> = containerInit.querySelectorAll("[ec-drop-target]");

                    if (!isTop) {
                        if (navbarScroll) {
                            navbarScroll.style.gridColumnEnd = "span 5"
                            navbarScroll.style.gridRowStart = "1";
                            drops.forEach(d => d.style.top = `${containerInit.clientHeight}px`);
                        }
                    } else {
                        if (!navbarScroll) {
                            bottomOption.removeAttribute("style");
                            drops.forEach(d => d.removeAttribute("style"));
                        }
                    }
                }
                if (bottomOption) {
                    window.addEventListener("scroll", () => {
                        movingBottomOptions();
                        positionStylingBottomOption();
                    })
                }
            }
        }

        if (responsiveInit.scrollyOnlyNavbar) {
            document.addEventListener("DOMContentLoaded", onlyNavbarScrolling);
        }


        function toggleMobile() {
            const btnMobile: HTMLElement = containerInit.querySelector("[ec-mobile-button]");
            const contextMobile: HTMLElement = containerInit.querySelector("[ec-context-menu-mobile]")
            let isShowing = false;
            btnMobile.addEventListener("click", () => {
                if (isShowing) {
                    isShowing = !isShowing
                    contextMobile.classList.remove("show");
                    btnMobile.setAttribute("ec-mobile-button", "false");
                } else {
                    isShowing = !isShowing
                    contextMobile.classList.add("show");
                    btnMobile.setAttribute("ec-mobile-button", "true");
                }
            })
        }

        toggleMobile();

        function ContextMenuToMobileContext() {
            const options = containerInit.querySelector("[ec-options]")
            const mobileContext = containerInit.querySelector("[ec-context-menu-mobile]")
            const navbar = containerInit.querySelector("[ec-navbar]");
            const bottomContext = containerInit.querySelector("[ec-bottom-options]");
            const windowWidth = window.innerWidth;

            //options
            if (windowWidth < 1023)
                mobileContext.appendChild(options);
            else {
                const optionsInContextMobile = containerInit.querySelector("[ec-context-menu-mobile] [ec-options]");
                if (optionsInContextMobile)
                    navbar.appendChild(optionsInContextMobile);
            }
            updateAlignItems(responsiveInit.logoAlignX, responsiveInit.logoAlignY, responsiveInit.toolsAlignX, responsiveInit.toolsAlignY);

            //bottom-options
            if (windowWidth < 1023) {
                mobileContext.appendChild(bottomContext);
            } else {
                const bottomContextMobile = containerInit.querySelector("[ec-context-menu-mobile] [ec-bottom-options]");
                if (bottomContextMobile) {
                    navbar.parentNode.insertBefore(bottomContext, navbar.nextSibling);
                }
            }
        }

        window.addEventListener("resize", ContextMenuToMobileContext)
        document.addEventListener("DOMContentLoaded", ContextMenuToMobileContext)

        function renderResponsive() {
            const windowWidth = window.innerWidth;
            const findPoint = responsive?.filter(e => e.mediaPoint > windowWidth).pop();
            if (findPoint)
                updateAlignItems(findPoint.logoAlignX, findPoint.logoAlignY, findPoint.toolsAlignX, findPoint.toolsAlignY);
            else
                updateAlignItems(responsiveInit.logoAlignX, responsiveInit.logoAlignY, responsiveInit.toolsAlignX, responsiveInit.toolsAlignY);
        }

        document.addEventListener("DOMContentLoaded", () => {
            renderResponsive();
            onlyNavbarScrolling();
        })
        document.addEventListener("DOMContentLoaded", renderResponsive)
    }

}